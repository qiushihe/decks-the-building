import Promise from "bluebird";
import map from "lodash/fp/map";
import flow from "lodash/fp/flow";
import isEmpty from "lodash/fp/isEmpty";
import concat from "lodash/fp/concat";
import uniq from "lodash/fp/uniq";
import compact from "lodash/fp/compact";

import { READY } from "/src/action/app.action";
import { ADD, update, restore } from "/src/action/card.action";
import { login } from "/src/selector/s3.selector";
import { cardName } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";
import { getFetchCardQueue } from "/src/api/scryfall.api";
import { getS3Client } from "/src/api/s3.api";
import { record } from "/src/storage";

import { cardHasDetail } from "/src/selector/card.selector";

export default ({ getState, dispatch }) => {
  let appReady = false;
  let pendingCardIds = [];

  const fetchCardDetail = ({ cardId }) => {
    const currentState = getState();
    const s3Login = login(currentState);
    const name = withProps({ cardId })(cardName)(currentState);

    if (!isEmpty(s3Login)) {
      return getS3Client({ login: s3Login })
        .downloadJson(`cards/${cardId}.json`)
        .then(cardJson => {
          return dispatch(update({ id: cardId, ...cardJson }));
        })
        .catch(() => getFetchCardQueue({ dispatch }).fetch({ cardId, name }));
    } else {
      return getFetchCardQueue({ dispatch }).fetch({ cardId, name });
    }
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
        const cardRecord = record("Card", cardId);

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
                .then(() => dispatch(restore({ id: cardId, ...details })));
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
