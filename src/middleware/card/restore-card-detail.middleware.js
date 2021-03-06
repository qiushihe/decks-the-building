import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import once from "lodash/fp/once";
import cond from "lodash/fp/cond";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";
import isNil from "lodash/fp/isNil";
import size from "lodash/fp/size";
import over from "lodash/fp/over";
import flatten from "lodash/fp/flatten";
import compact from "lodash/fp/compact";
import filter from "lodash/fp/filter";
import includes from "lodash/fp/includes";

import { READY } from "/src/action/app.action";
import { ADD, setCardsDetail, addFailedCardIds } from "/src/action/card.action";
import { cardName, allFailedCardIds } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";
import { contextualMiddleware } from "/src/util/middleware.util";
import { getMultiLevelCardCacheService } from "/src/service/card/multi-level-card-cache.service";
import { LEVEL_3 } from "/src/enum/app-readiness.enum";

const IDLE_DELAY = 2000;
const BUSY_DELAY = 10;
const BATCH_RANGE = [1, 100];
const BATCH_TIMINGS = [1000, 500];

export default contextualMiddleware({}, ({ getState, dispatch }) => {
  const pendingCardIds = [];

  let currentBatchSize = 5;
  let currentTaskPromise = null;

  const processRestoreQueue = () => {
    if (currentTaskPromise === null) {
      const currentState = getState();
      const batchStartTime = new Date().getTime();

      const cardIds = [];
      while (!isEmpty(pendingCardIds) && size(cardIds) < currentBatchSize) {
        const cardId = pendingCardIds.shift();
        if (!isNil(cardId)) {
          cardIds.push(cardId);
        }
      }

      currentTaskPromise = flow([
        filter(cardId =>
          flow([allFailedCardIds, negate(includes(cardId))])(currentState)
        ),
        map(cardId => ({
          cardId,
          cardName: withProps({ cardId })(cardName)(currentState)
        })),
        params =>
          getMultiLevelCardCacheService()
            .readCardsDetail(params)
            .then(
              flow([
                over([
                  flow([
                    filter(flow([get("error"), isNil])),
                    cond([
                      [
                        negate(isEmpty),
                        cardsDetail => dispatch(setCardsDetail(cardsDetail))
                      ]
                    ])
                  ]),
                  flow([
                    filter(flow([get("error"), negate(isNil)])),
                    cond([
                      [
                        negate(isEmpty),
                        flow([
                          map(get("id")),
                          ids => dispatch(addFailedCardIds({ ids }))
                        ])
                      ]
                    ])
                  ])
                ]),
                flatten,
                compact,
                Promise.all
              ])
            )
      ])(cardIds);

      currentTaskPromise
        .catch(err => console.error(err))
        .finally(() => {
          if (!isEmpty(cardIds)) {
            const batchConsumedTime = new Date().getTime() - batchStartTime;
            const perCardTime = batchConsumedTime / size(cardIds);

            if (batchConsumedTime >= BATCH_TIMINGS[0]) {
              const extraTime = batchConsumedTime - BATCH_TIMINGS[0];
              let extraCards = Math.ceil(extraTime / perCardTime);

              if (extraCards > currentBatchSize / 2) {
                extraCards = Math.ceil(currentBatchSize / 2);
              }

              currentBatchSize = currentBatchSize - extraCards;
            } else if (batchConsumedTime <= BATCH_TIMINGS[1]) {
              const extraTime = BATCH_TIMINGS[1] - batchConsumedTime;
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

        if (level === LEVEL_3) {
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
});
