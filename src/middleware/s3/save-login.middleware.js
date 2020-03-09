import Promise from "bluebird";

import { SET_LOGIN } from "/src/action/s3.action";

import { getS3Client } from "/src/api/s3.api";
import { contextualMiddleware } from "/src/util/middleware.util";
import { APP_READY } from "/src/enum/action-lifecycle.enum";

import { getMultiLevelPreferenceCacheService } from "/src/service/preference/multi-level-preference-cache.service";

export default contextualMiddleware({}, () => next => action => {
  const { type: actionType } = action;

  return Promise.resolve()
    .then(() => {
      if (actionType === SET_LOGIN) {
        const {
          payload: { login },
          context: { actionLifecycle } = {}
        } = action;

        if (actionLifecycle !== APP_READY) {
          return getS3Client()
            .setLogin(login)
            .then(() =>
              getMultiLevelPreferenceCacheService().writeLocalPreference(
                "credential",
                "s3-login",
                login
              )
            );
        }
      }
    })
    .then(() => next(action));
});
