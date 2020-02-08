import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";

import { READY } from "/src/action/app.action";
import { ADD, restore } from "/src/action/card.action";
import { getCardDetailService } from "/src/services/card-detail.service";

export default ({ getState, dispatch }) => {
  let appReady = false;
  let pendingCardIds = [];

  const restoreCardsByIds = flow([
    map(cardId =>
      getCardDetailService()
        .getDetailByCardId(getState, cardId)
        .then(cardDetail => dispatch(restore({ id: cardId, ...cardDetail })))
    ),
    Promise.all
  ]);

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
