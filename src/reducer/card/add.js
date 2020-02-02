export default (state = {}, { id, name } = {}) => {
  return {
    ...state,
    allCards: {
      ...state.allCards,
      [id]: {
        name,
        detail: null
      }
    }
  };
};
