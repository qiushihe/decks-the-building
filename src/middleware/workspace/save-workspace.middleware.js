import Promise from "bluebird";

import { SAVE } from "/src/action/workspace.action";
import { setWorkspaceStatus } from "/src/action/persistence-status.action";
import { getSaveToLocalService } from "/src/service/workspace/save-to-local.service";
import { contextualMiddleware } from "/src/util/middleware.util";
import { SAVING, SAVED_LOCALLY } from "/src/enum/persistence-status.enum";

import exportToJson from "./export-to-json";

export default contextualMiddleware(
  {},
  ({ dispatch, getState }) => next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === SAVE) {
        const newState = getState();

        const {
          payload: { id: workspaceId }
        } = action;

        return exportToJson(newState, workspaceId).then(data =>
          dispatch(setWorkspaceStatus({ id: workspaceId, status: SAVING }))
            .then(() => getSaveToLocalService().save(workspaceId, data))
            .then(() =>
              dispatch(
                setWorkspaceStatus({ id: workspaceId, status: SAVED_LOCALLY })
              )
            )
        );
      }
    });
  }
);
