import restoreWorkspaces from "./restore-workspaces.middleware";
import saveWorkspaces from "./save-workspace.middleware";
import deleteWorkspaces from "./delete-workspace.middleware";
import importFromRemote from "./import-from-remote.middleware";
import exportToRemote from "./export-to-remote.middleware";

export default [
  restoreWorkspaces,
  saveWorkspaces,
  deleteWorkspaces,
  importFromRemote,
  exportToRemote
];
