import restoreWorkspaces from "./restore-workspaces.middleware";
import saveWorkspace from "./save-workspace.middleware";
import deleteWorkspace from "./delete-workspace.middleware";
import importFromRemote from "./import-from-remote.middleware";
import exportToRemote from "./export-to-remote.middleware";
import autoSaveWorkspace from "./auto-save-workspace.middleware";

export default [
  restoreWorkspaces,
  saveWorkspace,
  deleteWorkspace,
  importFromRemote,
  exportToRemote,
  autoSaveWorkspace
];
