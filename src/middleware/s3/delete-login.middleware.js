import Promise from "bluebird";

import { CLEAR_LOGIN } from "/src/action/s3.action";
import { contextualMiddleware } from "/src/util/middleware.util";

import { getMultiLevelPreferenceCacheService } from "/src/service/preference/multi-level-preference-cache.service";

export default contextualMiddleware({}, () => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === CLEAR_LOGIN) {
      return getMultiLevelPreferenceCacheService().writeLocalPreference(
        "credential",
        "s3-login",
        ""
      );
    }
  });
});
