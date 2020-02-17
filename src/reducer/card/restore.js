export default (state = {}, { id, name, ...cardDetail } = {}) => {
  return {
    ...state,
    allCards: {
      ...state.allCards,
      [id]: {
        name,
        detail: {
          ...cardDetail
        }
      }
    }
  };
};
