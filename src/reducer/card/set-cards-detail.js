import reduce from "lodash/fp/reduce";

export default (state = {}, cardsDetail = []) => {
  return {
    ...state,
    allCards: {
      ...state.allCards,
      ...reduce(
        (result, { id, name, ...cardDetail }) => ({
          ...result,
          [id]: {
            name,
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
