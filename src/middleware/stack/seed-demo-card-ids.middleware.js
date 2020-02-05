import Promise from "bluebird";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import keys from "lodash/fp/keys";
import random from "lodash/fp/random";
import size from "lodash/fp/size";
import isEmpty from "lodash/fp/isEmpty";

import { CREATE, addCards } from "/src/action/stack.action";

export default ({ getState, dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === CREATE) {
      const newState = getState();

      const allCardIds = flow([get("card.allCards"), keys])(newState);

      const cardIdsCount = random(0, size(allCardIds) - 1);

      let stackCardIds = [];
      while (size(stackCardIds) < cardIdsCount) {
        stackCardIds = [
          ...stackCardIds,
          allCardIds[random(0, size(allCardIds) - 1)]
        ];
      }

      const {
        payload: { id: stackId }
      } = action;

      if (!isEmpty(stackCardIds)) {
        return dispatch(addCards({ id: stackId, cardIds: stackCardIds }));
      }
    }
  });
};
