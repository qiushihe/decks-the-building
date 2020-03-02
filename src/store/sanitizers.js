import size from "lodash/fp/size";

import { SET_CARD_NAMES } from "/src/action/card.action";

const actionSanitizer = (action = {}) => {
  if (action.type === SET_CARD_NAMES) {
    const { payload = {}, payload: { names = [] } = {} } = action;
    return {
      ...action,
      payload: { ...payload, names: `[Array of ${size(names)} values]` }
    };
  } else {
    return action;
  }
};

const stateSanitizer = (state = {}) => {
  const { card = {}, card: { allCardNames = [] } = {} } = state;

  return {
    ...state,
    card: {
      ...card,
      allCardNames: `[Array of ${size(allCardNames)} values]`
    }
  };
};

export default {
  actionSanitizer,
  stateSanitizer
};
