import Promise from "bluebird";

import { REMOVE } from "/src/action/workspace.action";
import { getDeleteFromLocalService } from "/src/service/workspace/delete-from-local.service";

export default () => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === REMOVE) {
      const {
        payload: { id: workspaceId }
      } = action;

      return getDeleteFromLocalService().delete(workspaceId);
    }
  });
};
