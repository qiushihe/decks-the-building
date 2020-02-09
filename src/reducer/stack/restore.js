export default (state = {}, { id, label } = {}) => {
  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        id,
        label,
        cards: []
      }
    }
  };
};
