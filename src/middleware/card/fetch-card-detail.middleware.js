import Promise from "bluebird";
import map from "lodash/fp/map";
import flow from "lodash/fp/flow";
import concat from "lodash/fp/concat";
import uniq from "lodash/fp/uniq";
import compact from "lodash/fp/compact";

import { READY } from "/src/action/app.action";
import { ADD, restoreFromS3, restoreFromCache } from "/src/action/card.action";
import { cardName } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";
import { getFetchCardQueue } from "/src/api/scryfall.api";
import { getS3Client } from "/src/api/s3.api";
import { getRecord } from "/src/api/localforge.api";

import { cardHasDetail } from "/src/selector/card.selector";

export default ({ getState, dispatch }) => {
  let appReady = false;
  let pendingCardIds = [];

  const fetchCardDetail = ({ cardId }) => {
    const currentState = getState();
    const name = withProps({ cardId })(cardName)(currentState);

    const s3Client = getS3Client();

    return s3Client.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        return s3Client
          .downloadJson(`cards/${cardId}.json`)
          .then(cardJson => {
            return dispatch(restoreFromS3({ id: cardId, ...cardJson }));
          })
          .catch(() => getFetchCardQueue({ dispatch }).fetch({ cardId, name }));
      } else {
        return getFetchCardQueue({ dispatch }).fetch({ cardId, name });
      }
    });
  };

  const fetchCardsIfReady = () => {
    if (appReady) {
      return flow([map(cardId => fetchCardDetail({ cardId })), Promise.all])(
        pendingCardIds
      );
    } else {
      return Promise.resolve();
    }
  };

  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === READY) {
        appReady = true;
        return fetchCardsIfReady();
      } else if (actionType === ADD) {
        const {
          payload: { id: cardId }
        } = action;

        const newState = getState();
        const hasDetail = withProps({ cardId })(cardHasDetail)(newState);
        const cardRecord = getRecord("Card", cardId);

        if (!hasDetail) {
          return cardRecord.exists().then(exists => {
            if (exists) {
              const details = {};
              return cardRecord
                .getAttrs()
                .then(
                  flow([
                    map(name =>
                      cardRecord.getAttr(name).then(value => {
                        details[name] = value;
                      })
                    ),
                    Promise.all
                  ])
                )
                .then(() =>
                  dispatch(restoreFromCache({ id: cardId, ...details }))
                );
            } else {
              if (appReady) {
                return fetchCardDetail({ cardId });
              } else {
                pendingCardIds = flow([concat([cardId]), compact, uniq])(
                  pendingCardIds
                );
                return fetchCardsIfReady();
              }
            }
          });
        }
      }
    });
  };
};
