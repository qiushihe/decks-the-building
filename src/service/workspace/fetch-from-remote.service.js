import { getS3Client } from "/src/api/s3.api";

class FetchFromRemoteService {
  constructor() {
    this.s3 = getS3Client();
  }

  fetch(workspaceId) {
    return this.s3.fetchWorkspaceById(workspaceId);
  }
}

let DefaultInstance = null;

export const getFetchFromRemoteService = () => {
  if (DefaultInstance === null) {
    DefaultInstance = new FetchFromRemoteService();
  }
  return DefaultInstance;
};
