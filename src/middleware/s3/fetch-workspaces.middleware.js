import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { getS3Client } from "/src/api/s3.api";

import {
  SET_LOGIN,
  FETCH_AVAILABLE_WORKSPACES,
  clearLogin,
  addAvailableWorkspace
} from "/src/action/s3.action";

export default ({ dispatch }) => next => action => {
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
    if (actionType === SET_LOGIN) {
      const {
        payload: { login }
      } = action;

      return s3Client
        .setLogin(login)
        .then(fetchAvailableWorkspaces)
        .catch(() => dispatch(clearLogin()));
    } else if (actionType === FETCH_AVAILABLE_WORKSPACES) {
      return fetchAvailableWorkspaces().catch(() => dispatch(clearLogin()));
    }
  });
};
