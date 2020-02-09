export default (state = {}, { id, label } = {}) => {
  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        ...state.allStacks[id],
        label
      }
    }
  };
};
