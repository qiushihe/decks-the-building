import restoreWorkspaces from "./restore-workspaces.middleware";
import restoreWorkspace from "./restore-workspace.middleware";
import saveWorkspaces from "./save-workspace.middleware";
import deleteWorkspaces from "./delete-workspace.middleware";

export default [
  restoreWorkspaces,
  restoreWorkspace,
  saveWorkspaces,
  deleteWorkspaces
];
