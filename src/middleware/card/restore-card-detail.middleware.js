import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import concat from "lodash/fp/concat";
import once from "lodash/fp/once";
import cond from "lodash/fp/cond";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";
import size from "lodash/fp/size";

import { READY } from "/src/action/app.action";
import { ADD, setCardsDetail } from "/src/action/card.action";
import { cardName } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";
import { getMultiLevelCacheService } from "/src/service/card/multi-level-cache-read.service";
import { contextualMiddleware } from "/src/util/middleware.util";

const IDLE_DELAY = 2000;
const BUSY_DELAY = 10;
const BATCH_RANGE = [1, 100];
const BATCH_TIMINGS = [1000, 500];

export default contextualMiddleware({}, ({ getState, dispatch }) => {
  let pendingCardIds = [];
  let currentBatchSize = 5;
  let currentBatchTime = 0;
  let currentTaskPromise = null;

  const processRestoreQueue = () => {
    if (currentTaskPromise === null) {
      const currentState = getState();
      const batchStartTime = new Date().getTime();

      const cardIds = pendingCardIds.slice(0, currentBatchSize);
      pendingCardIds = pendingCardIds.slice(currentBatchSize);

      currentTaskPromise = flow([
        map(cardId => ({
          cardId,
          cardName: withProps({ cardId })(cardName)(currentState)
        })),
        params =>
          getMultiLevelCacheService()
            .readCardsDetail(params)
            .then(
              cond([
                [
                  negate(isEmpty),
                  cardsDetail => dispatch(setCardsDetail(cardsDetail))
                ]
              ])
            )
      ])(cardIds);

      currentTaskPromise
        .catch(err => console.warn(err))
        .finally(() => {
          if (!isEmpty(cardIds)) {
            currentBatchTime = new Date().getTime() - batchStartTime;
            const perCardTime = currentBatchTime / size(cardIds);

            if (currentBatchTime >= BATCH_TIMINGS[0]) {
              const extraTime = currentBatchTime - BATCH_TIMINGS[0];
              let extraCards = Math.ceil(extraTime / perCardTime);

              if (extraCards > currentBatchSize / 2) {
                extraCards = Math.ceil(currentBatchSize / 2);
              }

              currentBatchSize = currentBatchSize - extraCards;
            } else if (currentBatchTime <= BATCH_TIMINGS[1]) {
              const extraTime = BATCH_TIMINGS[1] - currentBatchTime;
              let extraCards = Math.floor(extraTime / perCardTime);

              if (extraCards > currentBatchSize / 2) {
                extraCards = Math.floor(currentBatchSize / 2);
              }

              currentBatchSize = currentBatchSize + extraCards;
            }

            if (currentBatchSize < BATCH_RANGE[0]) {
              currentBatchSize = BATCH_RANGE[0];
            } else if (currentBatchSize > BATCH_RANGE[1]) {
              currentBatchSize = BATCH_RANGE[1];
            }
          }

          currentTaskPromise = null;
          return new Promise(resolve => {
            setTimeout(resolve, isEmpty(cardIds) ? IDLE_DELAY : BUSY_DELAY);
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

        pendingCardIds = flow([map(get("id")), concat(pendingCardIds)])(cards);
      }
    });
  };
});
