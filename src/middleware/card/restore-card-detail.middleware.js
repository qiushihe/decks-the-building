import Promise from "bluebird";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import once from "lodash/fp/once";
import isNil from "lodash/fp/isNil";

import { READY } from "/src/action/app.action";
import { ADD, restore } from "/src/action/card.action";
import { cardName } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";
import { getMultiLevelCacheService } from "/src/service/card/multi-level-cache-read.service";

const IDLE_DELAY = 2000;
const BUSY_DELAY = 10;

export default ({ getState, dispatch }) => {
  const pendingCardIds = [];
  let currentTaskPromise = null;

  const processRestoreQueue = () => {
    if (currentTaskPromise === null) {
      const currentState = getState();

      const id = pendingCardIds.shift();

      currentTaskPromise = Promise.resolve().then(() => {
        if (!isNil(id)) {
          const name = withProps({ cardId: id })(cardName)(currentState);

          return getMultiLevelCacheService()
            .readCardDetail(id, name)
            .then(cardDetail => dispatch(restore({ id, ...cardDetail })));
        }
      });

      currentTaskPromise
        .catch(err => console.warn(err))
        .finally(() => {
          currentTaskPromise = null;
          return new Promise(resolve => {
            setTimeout(resolve, isNil(id) ? IDLE_DELAY : BUSY_DELAY);
          }).then(processRestoreQueue);
        });

      return currentTaskPromise;
    } else {
      return currentTaskPromise;
    }
  };

  const startRestoreQueue = once(() => {
    return processRestoreQueue();
  });

  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === READY) {
        const {
          payload: { level }
        } = action;

        if (level === 3) {
          return startRestoreQueue();
        }
      } else if (actionType === ADD) {
        const {
          payload: { cards }
        } = action;

        map(card => pendingCardIds.push(get("id")(card)))(cards);
      }
    });
  };
};
