import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";

import { getLocalForgeClient } from "/src/api/localforge.api";

class FetchAllFromLocalService {
  constructor() {
    this.localForge = getLocalForgeClient();
  }

  retrieveAll() {
    return this.localForge
      .fetchAllWorkspaceIds()
      .then(
        flow([
          map(workspaceId => this.localForge.fetchWorkspaceById(workspaceId)),
          Promise.all
        ])
      );
  }
}

let DefaultInstance = null;

export const getFetchAllFromLocalService = () => {
  if (DefaultInstance === null) {
    DefaultInstance = new FetchAllFromLocalService();
  }
  return DefaultInstance;
};
