export default (state = {}, { id, laneId, label } = {}) => {
  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        id,
        laneId,
        label
      }
    }
  };
};
