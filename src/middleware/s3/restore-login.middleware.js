import Promise from "bluebird";
import isNil from "lodash/fp/isNil";
import isEmpty from "lodash/fp/isEmpty";

import { READY } from "/src/action/app.action";
import { setLogin } from "/src/action/s3.action";

import { getS3Client } from "/src/api/s3.api";
import { contextualMiddleware } from "/src/util/middleware.util";
import { APP_READY } from "/src/enum/action-lifecycle.enum";
import { LEVEL_1 } from "/src/enum/app-readiness.enum";

import { getMultiLevelPreferenceCacheService } from "/src/service/preference/multi-level-preference-cache.service";

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

          if (level === LEVEL_1) {
            return getMultiLevelPreferenceCacheService()
              .readLocalPreference("credential", "s3-login")
              .catch(() => null)
              .then(login => {
                if (!isNil(login) && !isEmpty(login)) {
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
