import Promise from "bluebird";

import { SAVE } from "/src/action/workspace.action";
import { getSaveToLocalService } from "/src/service/workspace/save-to-local.service";

import exportToJson from "./export-to-json";

export default ({ getState }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === SAVE) {
      const newState = getState();

      const {
        payload: { id: workspaceId }
      } = action;

      return exportToJson(newState, workspaceId).then(data =>
        getSaveToLocalService().save(workspaceId, data)
      );
    }
  });
};
