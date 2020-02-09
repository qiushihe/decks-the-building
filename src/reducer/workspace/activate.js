export default (state = {}, { id } = {}) => {
  return {
    ...state,
    activeWorkspaceId: id
  };
};
