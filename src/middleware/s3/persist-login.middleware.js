import Promise from "bluebird";
import constant from "lodash/fp/constant";

import { BOOT } from "/src/action/app.action";
import { UPDATE_LOGIN, restoreLogin } from "/src/action/s3.action";
import { getRecord } from "/src/api/localforge.api";
import { getS3Client } from "/src/api/s3.api";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === BOOT) {
      return getRecord("Login", "S3")
        .getAttr("value")
        .then(value =>
          getS3Client()
            .setLogin(value)
            .then(constant(value))
        )
        .then(value => dispatch(restoreLogin({ login: value })));
    } else if (actionType === UPDATE_LOGIN) {
      const {
        payload: { login }
      } = action;
      return getS3Client()
        .setLogin(login)
        .then(() => getRecord("Login", "S3").setAttr("value", login));
    }
  });
};
