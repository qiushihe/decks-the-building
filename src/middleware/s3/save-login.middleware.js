import Promise from "bluebird";

import { SET_LOGIN } from "/src/action/s3.action";

import { getS3Client } from "/src/api/s3.api";
import { getLocalForgeClient } from "/src/api/localforge.api";

export default () => next => action => {
  const { type: actionType } = action;

  return Promise.resolve()
    .then(() => {
      if (actionType === SET_LOGIN) {
        const {
          payload: { login }
        } = action;

        return getS3Client()
          .setLogin(login)
          .then(() => getLocalForgeClient().storeCredential("S3", login));
      }
    })
    .then(() => next(action));
};