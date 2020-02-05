import Promise from "bluebird";
import constant from "lodash/fp/constant";

import { BOOT } from "/src/action/app.action";
import { UPDATE_LOGIN, restoreLogin } from "/src/action/s3.action";
import { getLocalForgeClient } from "/src/api/localforge.api";
import { getS3Client } from "/src/api/s3.api";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === BOOT) {
      return getLocalForgeClient()
        .fetchS3Login()
        .then(login =>
          getS3Client()
            .setLogin(login)
            .then(constant(login))
        )
        .then(value => dispatch(restoreLogin({ login: value })));
    } else if (actionType === UPDATE_LOGIN) {
      const {
        payload: { login }
      } = action;
      return getS3Client()
        .setLogin(login)
        .then(() => getLocalForgeClient().storeS3Login(login));
    }
  });
};
