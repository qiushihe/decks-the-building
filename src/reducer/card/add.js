import flow from "lodash/fp/flow";
import toLower from "lodash/fp/toLower";
import trim from "lodash/fp/trim";

import { encode } from "/src/util/base64.util";

export default (state = {}, { name } = {}) => {
  const cardId = flow([trim, toLower, encode])(name);

  return {
    ...state,
    allCards: {
      ...state.allCards,
      [cardId]: {
        id: cardId,
        name
      }
    }
  };
};
