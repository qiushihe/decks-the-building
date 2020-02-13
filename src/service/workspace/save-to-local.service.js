import { getLocalForgeClient } from "/src/api/localforge.api";

class SaveToLocalService {
  constructor() {
    this.localForge = getLocalForgeClient();
  }

  save(workspaceId, workspaceData) {
    return this.localForge.storeWorkspaceById(workspaceId, workspaceData);
  }
}

let DefaultInstance = null;

export const getSaveToLocalService = () => {
  if (DefaultInstance === null) {
    DefaultInstance = new SaveToLocalService();
  }
  return DefaultInstance;
};
