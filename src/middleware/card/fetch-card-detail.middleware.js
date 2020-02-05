import Promise from "bluebird";
import map from "lodash/fp/map";
import flow from "lodash/fp/flow";
import concat from "lodash/fp/concat";
import uniq from "lodash/fp/uniq";
import compact from "lodash/fp/compact";

import { READY } from "/src/action/app.action";
import { cardName, cardHasDetail } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";
import { getScryfallClient } from "/src/api/scryfall.api";
import { getS3Client } from "/src/api/s3.api";
import { getLocalForgeClient } from "/src/api/localforge.api";

import {
  ADD,
  restoreFromScryfall,
  restoreFromS3,
  restoreFromCache
} from "/src/action/card.action";

export default ({ getState, dispatch }) => {
  let appReady = false;
  let pendingCardIds = [];

  const fetchCardDetail = ({ cardId }) => {
    const currentState = getState();
    const name = withProps({ cardId })(cardName)(currentState);

    const scryfallClient = getScryfallClient();
    const s3Client = getS3Client();

    return s3Client.isLoggedIn().then(loggedIn => {
      if (loggedIn) {
        return s3Client
          .fetchCardById(cardId)
          .then(cardDetail => {
            return dispatch(restoreFromS3({ id: cardId, ...cardDetail }));
          })
          .catch(() =>
            scryfallClient.fetchCardByName(name).then(cardDetail => {
              return dispatch(
                restoreFromScryfall({ id: cardId, ...cardDetail })
              );
            })
          );
      } else {
        return scryfallClient.fetchCardByName(name).then(cardDetail => {
          return dispatch(restoreFromScryfall({ id: cardId, ...cardDetail }));
        });
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
        const localForgeClient = getLocalForgeClient();

        if (!hasDetail) {
          localForgeClient
            .fetchCardById(cardId)
            .then(cardDetail => {
              return dispatch(restoreFromCache({ id: cardId, ...cardDetail }));
            })
            .catch(() => {
              if (appReady) {
                return fetchCardDetail({ cardId });
              } else {
                pendingCardIds = flow([concat([cardId]), compact, uniq])(
                  pendingCardIds
                );
                return fetchCardsIfReady();
              }
            });
        }
      }
    });
  };
};
