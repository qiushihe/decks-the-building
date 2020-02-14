import { getLocalForgeClient } from "/src/api/localforge.api";

class DeleteFromLocalService {
  constructor() {
    this.localForge = getLocalForgeClient();
  }

  delete(workspaceId) {
    return this.localForge.deleteWorkspaceById(workspaceId);
  }
}

let DefaultInstance = null;

export const getDeleteFromLocalService = () => {
  if (DefaultInstance === null) {
    DefaultInstance = new DeleteFromLocalService();
  }
  return DefaultInstance;
};
