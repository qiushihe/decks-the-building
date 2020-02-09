export default (state = {}, { id, label } = {}) => {
  return {
    ...state,
    allWorkspaces: {
      ...state.allWorkspaces,
      [id]: {
        ...state.allWorkspaces[id],
        label
      }
    }
  };
};
