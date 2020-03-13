import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";
import isNil from "lodash/fp/isNil";

export default (state = {}, { cards } = {}) => {
  return {
    ...state,
    allCards: reduce(
      (result, { id, name }) =>
        isNil(result[id])
          ? {
              ...result,
              [id]: {
                id,
                name,
                detail: null
              }
            }
          : result,
      get("allCards")(state)
    )(cards)
  };
};
