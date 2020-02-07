export default (state = {}, { id, label } = {}) => {
  return {
    ...state,
    allLanes: {
      ...state.allLanes,
      [id]: {
        id,
        label,
        stacks: []
      }
    }
  };
};
