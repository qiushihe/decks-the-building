import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import {
  SET_LOGIN,
  FETCH_AVAILABLE_WORKSPACES,
  clearLogin,
  addAvailableWorkspace
} from "/src/action/s3.action";

import { getS3Client } from "/src/api/s3.api";
import { READY } from "/src/action/app.action";
import { contextualMiddleware } from "/src/util/middleware.util";
import { APP_READY } from "/src/enum/action-lifecycle.enum";
import { LEVEL_2 } from "/src/enum/app-readiness.enum";

export default contextualMiddleware({}, ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  const s3Client = getS3Client();

  const fetchAvailableWorkspaces = () => {
    return s3Client
      .fetchAllWorkspaceIds()
      .then(
        flow([
          map(workspaceId => s3Client.fetchWorkspaceById(workspaceId)),
          Promise.all
        ])
      )
      .then(
        flow([
          map(data => dispatch(addAvailableWorkspace({ data }))),
          Promise.all
        ])
      );
  };

  return Promise.resolve(next(action)).then(() => {
    if (actionType === READY) {
      const {
        payload: { level }
      } = action;

      if (level === LEVEL_2 && s3Client.isLoggedIn()) {
        return fetchAvailableWorkspaces().catch(() => dispatch(clearLogin()));
      }
    } else if (actionType === SET_LOGIN) {
      const { context: { actionLifecycle } = {} } = action;

      if (actionLifecycle !== APP_READY) {
        return fetchAvailableWorkspaces().catch(() => dispatch(clearLogin()));
      }
    } else if (actionType === FETCH_AVAILABLE_WORKSPACES) {
      return fetchAvailableWorkspaces().catch(() => dispatch(clearLogin()));
    }
  });
});
