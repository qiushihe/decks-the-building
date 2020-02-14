import Promise from "bluebird";
import uuidV4 from "uuid/v4";

import {
  EXPORT_WORKSPACE,
  clearAvailableWorkspaces,
  fetchAvailableWorkspaces
} from "/src/action/s3.action";

import { getSaveToRemoteService } from "/src/service/workspace/save-to-remote.service";

import exportToJson from "./export-to-json";

export default ({ getState, dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === EXPORT_WORKSPACE) {
      const newState = getState();

      const {
        payload: { localId, remoteId }
      } = action;

      return exportToJson(newState, localId)
        .then(data => ({
          ...data,
          id: remoteId || uuidV4()
        }))
        .then(data => getSaveToRemoteService().save(data.id, data))
        .then(() =>
          dispatch(clearAvailableWorkspaces()).then(() =>
            dispatch(fetchAvailableWorkspaces())
          )
        );
    }
  });
};
