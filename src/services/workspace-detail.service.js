import constant from "lodash/fp/constant";
import uniq from "lodash/fp/uniq";

import { getLocalForgeClient } from "/src/api/localforge.api";
import { getS3Client } from "/src/api/s3.api";

class WorkspaceDetailService {
  constructor() {
    this.localForge = getLocalForgeClient();
    this.s3 = getS3Client();
  }

  retrieveAllWorkspaceIds() {
    return this.localForge.fetchAllWorkspaceIds().then(idsFromLocalForge =>
      this.s3
        .fetchAllWorkspaceIds()
        .then(idsFromS3 => [...idsFromLocalForge, ...idsFromS3])
        .catch(constant(idsFromLocalForge))
        .then(uniq)
    );
  }

  retrieveDetailByWorkspaceId(_, workspaceId) {
    return this.localForge
      .fetchWorkspaceById(workspaceId)
      .catch(() =>
        this.s3
          .fetchWorkspaceById(workspaceId)
          .then(workspaceData =>
            this.localForge
              .storeWorkspaceById(workspaceId, workspaceData)
              .then(constant(workspaceData))
          )
      );
  }

  storeDetailByWorkspaceId(_, workspaceId, workspaceData) {
    return this.localForge
      .storeWorkspaceById(workspaceId, workspaceData)
      .then(() =>
        this.s3
          .storeWorkspaceById(workspaceId, workspaceData)
          .catch(constant(workspaceData))
      )
      .then(constant(workspaceData));
  }
}

let WorkspaceDetailServiceInstance = null;

export const getWorkspaceDetailService = () => {
  if (WorkspaceDetailServiceInstance === null) {
    WorkspaceDetailServiceInstance = new WorkspaceDetailService();
  }
  return WorkspaceDetailServiceInstance;
};
