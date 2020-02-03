import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const UPDATE_LOGIN = "S3/UPDATE_LOGIN";
export const RESTORE_LOGIN = "S3/RESTORE_LOGIN";

export const updateLogin = createPromisedAction(
  UPDATE_LOGIN,
  ["login"],
  invoke
);

export const restoreLogin = createPromisedAction(
  RESTORE_LOGIN,
  ["login"],
  invoke
);
