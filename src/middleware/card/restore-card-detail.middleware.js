import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";

import { READY } from "/src/action/app.action";
import { ADD, restore } from "/src/action/card.action";
import { cardName } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";
import { getMultiLevelCacheService } from "/src/service/card/multi-level-cache-read.service";

export default ({ getState, dispatch }) => {
  let appReady = false;
  let pendingCardIds = [];

  const restoreCardsByIds = cardIds => {
    const currentState = getState();

    return flow([
      map(id => ({
        id,
        name: withProps({ cardId: id })(cardName)(currentState)
      })),
      map(({ id, name }) =>
        getMultiLevelCacheService()
          .read(id, name)
          .then(cardDetail => dispatch(restore({ id, ...cardDetail })))
      ),
      Promise.all
    ])(cardIds);
  };

  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === READY) {
        appReady = true;
        return restoreCardsByIds(pendingCardIds);
      } else if (actionType === ADD) {
        const {
          payload: { cards }
        } = action;

        const cardIds = map(get("id"))(cards);

        if (appReady) {
          return restoreCardsByIds(cardIds);
        } else {
          pendingCardIds = [...pendingCardIds, ...cardIds];
        }
      }
    });
  };
};
