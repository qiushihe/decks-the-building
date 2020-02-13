export default (state = {}, { data } = {}) => {
  return {
    ...state,
    availableWorkspaces: [...state.availableWorkspaces, data]
  };
};
