import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const SHOW = "MODAL/SHOW";
export const HIDE = "MODAL/HIDE";

export const show = createPromisedAction(SHOW, ["name", "props"], invoke);

export const hide = createPromisedAction(HIDE, [], invoke);
