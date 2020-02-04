import Promise from "bluebird";

import { BOOT } from "/src/action/app.action";
import { UPDATE_LOGIN, restoreLogin } from "/src/action/s3.action";
import { getRecord } from "/src/api/localforge.api";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === BOOT) {
      return getRecord("Login", "S3")
        .getAttr("value")
        .then(value => {
          return dispatch(restoreLogin({ login: value }));
        });
    } else if (actionType === UPDATE_LOGIN) {
      const {
        payload: { login }
      } = action;
      return getRecord("Login", "S3").setAttr("value", login);
    }
  });
};
