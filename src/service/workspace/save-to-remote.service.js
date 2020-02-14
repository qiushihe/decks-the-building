import { getS3Client } from "/src/api/s3.api";

class SaveToRemoteService {
  constructor() {
    this.s3 = getS3Client();
  }

  save(workspaceId, workspaceData) {
    return this.s3.storeWorkspaceById(workspaceId, workspaceData);
  }
}

let DefaultInstance = null;

export const getSaveToLocalService = () => {
  if (DefaultInstance === null) {
    DefaultInstance = new SaveToRemoteService();
  }
  return DefaultInstance;
};
