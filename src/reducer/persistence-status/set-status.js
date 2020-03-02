import { WORKSPACE } from "/src/enum/object.enum";

export default (state = {}, { object, id, status }) => {
  if (object === WORKSPACE) {
    return {
      ...state,
      workspaces: {
        ...state.workspaces,
        [id]: status
      }
    };
  } else {
    return state;
  }
};
