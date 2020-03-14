import reduce from "lodash/fp/reduce";
import getOr from "lodash/fp/getOr";

export default (state = {}, cardsDetail = []) => {
  return {
    ...state,
    allCards: {
      ...state.allCards,
      ...reduce(
        (result, { id, name, error, ...cardDetail }) => ({
          ...result,
          [id]: {
            ...getOr({}, id)(state.allCards),
            id,
            name,
            error,
            detail: {
              ...cardDetail
            }
          }
        }),
        {}
      )(cardsDetail)
    }
  };
};
