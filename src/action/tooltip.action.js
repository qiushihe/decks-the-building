import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const SHOW = "TOOLTIP/SHOW";
export const HIDE = "TOOLTIP/HIDE";

export const show = createPromisedAction(SHOW, ["id", "name", "props"], invoke);

export const hide = createPromisedAction(HIDE, [], invoke);
