import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import first from "lodash/fp/first";
import isNil from "lodash/fp/isNil";
import isEmpty from "lodash/fp/isEmpty";
import includes from "lodash/fp/includes";

import { READY } from "/src/action/app.action";
import { create, activate } from "/src/action/workspace.action";
import { contextualMiddleware } from "/src/util/middleware.util";
import { APP_READY } from "/src/enum/action-lifecycle.enum";
import { getFetchAllFromLocalService } from "/src/service/workspace/fetch-all-from-local.service";
import { getMultiLevelPreferenceCacheService } from "/src/service/preference/multi-level-preference-cache.service";

import importFromJson from "./import-from-json";

export default contextualMiddleware(
  { actionLifecycle: APP_READY },
  ({ dispatch }) => next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === READY) {
        const {
          payload: { level }
        } = action;

        if (level === 3) {
          return getFetchAllFromLocalService()
            .retrieveAll()
            .then(workspacesData => {
              if (isEmpty(workspacesData)) {
                return dispatch(
                  create({ id: uuidV4(), label: "Untitled" })
                ).then(({ payload: { id } }) => dispatch(activate({ id })));
              } else {
                const importedFromJson = flow([
                  map(data => importFromJson(dispatch, data)),
                  Promise.all
                ])(workspacesData);

                return importedFromJson.then(importedWorkspaceIds =>
                  getMultiLevelPreferenceCacheService()
                    .readPreference("workspace", "active-workspace-id")
                    .then(activeWorkspaceId =>
                      includes(activeWorkspaceId)(importedWorkspaceIds)
                        ? activeWorkspaceId
                        : first(importedWorkspaceIds)
                    )
                    .then(workspaceId => {
                      if (!isNil(workspaceId) && !isEmpty(workspaceId)) {
                        return dispatch(activate({ id: workspaceId }));
                      }
                    })
                );
              }
            });
        }
      }
    });
  }
);
