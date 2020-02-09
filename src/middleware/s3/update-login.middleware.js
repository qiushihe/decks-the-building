import Promise from "bluebird";

import { UPDATE_LOGIN, loggedIn } from "/src/action/s3.action";
import { getS3Client } from "/src/api/s3.api";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === UPDATE_LOGIN) {
      const {
        payload: { login }
      } = action;

      return getS3Client()
        .setLogin(login)
        .then(() => dispatch(loggedIn()));
    }
  });
};
