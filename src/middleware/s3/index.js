import fetchWorkspaces from "./fetch-workspaces.middleware";
import saveLogin from "./save-login.middleware";
import deleteLogin from "./delete-login.middleware";
import restoreLogin from "./restore-login.middleware";

export default [fetchWorkspaces, saveLogin, deleteLogin, restoreLogin];
