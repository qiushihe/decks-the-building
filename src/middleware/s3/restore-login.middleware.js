import Promise from "bluebird";

import { READY } from "/src/action/app.action";
import { setLogin } from "/src/action/s3.action";

import { getS3Client } from "/src/api/s3.api";
import { getLocalForgeClient } from "/src/api/localforge.api";
import { contextualMiddleware } from "/src/util/middleware.util";
import { APP_READY } from "/src/enum/action-lifecycle.enum";

export default contextualMiddleware(
  { actionLifecycle: APP_READY },
  ({ dispatch }) => next => action => {
    const { type: actionType } = action;

    return Promise.resolve()
      .then(() => {
        if (actionType === READY) {
          const {
            payload: { level }
          } = action;

          if (level === 1) {
            return getLocalForgeClient()
              .fetchCredential("S3")
              .catch(() => null)
              .then(login => {
                if (login !== null) {
                  return getS3Client()
                    .setLogin(login)
                    .then(() => dispatch(setLogin({ login })));
                } else {
                  return dispatch(setLogin({ login: "" }));
                }
              });
          }
        }
      })
      .then(() => next(action));
  }
);
