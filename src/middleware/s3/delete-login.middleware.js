import Promise from "bluebird";

import { CLEAR_LOGIN } from "/src/action/s3.action";

import { getLocalForgeClient } from "/src/api/localforge.api";

export default () => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === CLEAR_LOGIN) {
      return getLocalForgeClient().deleteCredential("S3");
    }
  });
};
