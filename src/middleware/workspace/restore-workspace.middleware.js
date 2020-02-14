import Promise from "bluebird";

import { RESTORE_FROM_JSON } from "/src/action/workspace.action";

import importFromJson from "./import-from-json";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === RESTORE_FROM_JSON) {
      const {
        payload: { data: workspaceData }
      } = action;

      return importFromJson(dispatch, workspaceData);
    }
  });
};
