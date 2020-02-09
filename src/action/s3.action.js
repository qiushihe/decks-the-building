import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const UPDATE_LOGIN = "S3/UPDATE_LOGIN";
export const LOGGED_IN = "S3/LOGGED_IN";

export const updateLogin = createPromisedAction(
  UPDATE_LOGIN,
  ["login"],
  invoke
);

export const loggedIn = createPromisedAction(LOGGED_IN, [], invoke);
