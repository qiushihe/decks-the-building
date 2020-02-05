import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { READY } from "/src/action/app.action";
import { ADD, restore } from "/src/action/card.action";
import { getCardDetailService } from "/src/services/card-detail.service";

export default ({ getState, dispatch }) => {
  let appReady = false;
  let pendingCardIds = [];

  const restoreCardById = cardId =>
    getCardDetailService()
      .getDetailByCardId(getState, cardId)
      .then(cardDetail => dispatch(restore({ id: cardId, ...cardDetail })));

  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === READY) {
        appReady = true;
        return flow([map(restoreCardById), Promise.all])(pendingCardIds);
      } else if (actionType === ADD) {
        const {
          payload: { id: cardId }
        } = action;

        if (appReady) {
          return restoreCardById(cardId);
        } else {
          pendingCardIds = [...pendingCardIds, cardId];
        }
      }
    });
  };
};
