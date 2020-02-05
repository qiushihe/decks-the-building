import Promise from "bluebird";

import { ADD, restore } from "/src/action/card.action";
import { getCardDetailService } from "/src/services/card-detail.service";

export default ({ getState, dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === ADD) {
      const {
        payload: { id: cardId }
      } = action;

      return getCardDetailService()
        .getDetailByCardId(getState, cardId)
        .then(cardDetail => {
          return dispatch(restore({ id: cardId, ...cardDetail }));
        });
    }
  });
};
