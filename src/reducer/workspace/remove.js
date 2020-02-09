import reduce from "lodash/fp/reduce";

export default (state = {}, { id } = {}) => {
  return {
    ...state,
    allWorkspaces: reduce(
      (result, workspace) =>
        workspace.id === id
          ? result
          : {
              ...result,
              [workspace.id]: workspace
            },
      {}
    )(state.allWorkspaces)
  };
};
