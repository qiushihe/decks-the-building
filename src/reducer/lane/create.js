export default (state = {}, { id, label } = {}) => {
  return {
    ...state,
    allLanes: [
      ...state.allLanes,
      {
        id,
        label,
        stacks: []
      }
    ]
  };
};
