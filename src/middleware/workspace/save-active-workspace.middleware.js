import Promise from "bluebird";

import { ACTIVATE } from "/src/action/workspace.action";
import { contextualMiddleware } from "/src/util/middleware.util";
import { getMultiLevelPreferenceCacheService } from "/src/service/preference/multi-level-preference-cache.service";

export default contextualMiddleware({}, () => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === ACTIVATE) {
      const {
        payload: { id: workspaceId }
      } = action;

      return getMultiLevelPreferenceCacheService().writePreference(
        "workspace",
        "active-workspace-id",
        workspaceId
      );
    }
  });
});
