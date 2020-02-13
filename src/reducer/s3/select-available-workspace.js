export default (state = {}, { id } = {}) => {
  return {
    ...state,
    selectedWorkspaceId: id
  };
};
