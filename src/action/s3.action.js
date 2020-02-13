import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const SET_LOGIN = "S3/SET_LOGIN";
export const CLEAR_LOGIN = "S3/CLEAR_LOGIN";
export const ADD_AVAILABLE_WORKSPACE = "S3/ADD_AVAILABLE_WORKSPACE";
export const SELECT_AVAILABLE_WORKSPACE = "S3/SELECT_AVAILABLE_WORKSPACE";
export const IMPORT_WORKSPACE = "S3/IMPORT_WORKSPACE";
export const EXPORT_WORKSPACE = "S3/EXPORT_WORKSPACE";

export const setLogin = createPromisedAction(SET_LOGIN, ["login"], invoke);

export const clearLogin = createPromisedAction(CLEAR_LOGIN, [], invoke);

export const addAvailableWorkspace = createPromisedAction(
  ADD_AVAILABLE_WORKSPACE,
  ["data"],
  invoke
);

export const selectAvailableWorkspace = createPromisedAction(
  SELECT_AVAILABLE_WORKSPACE,
  ["id"],
  invoke
);

export const importWorkspace = createPromisedAction(
  IMPORT_WORKSPACE,
  ["remoteId", "localId"],
  invoke
);

export const exportWorkspace = createPromisedAction(
  EXPORT_WORKSPACE,
  ["localId", "remoteId"],
  invoke
);
