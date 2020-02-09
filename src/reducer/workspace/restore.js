export default (state = {}, { id, label } = {}) => {
  return {
    ...state,
    allWorkspaces: {
      ...state.allWorkspaces,
      [id]: {
        id,
        label,
        lanes: []
      }
    }
  };
};
