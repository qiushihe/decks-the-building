import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const BOOT = "APP/BOOT";
export const READY = "APP/READY";

export const boot = createPromisedAction(BOOT, [], invoke);

export const ready = createPromisedAction(READY, ["level"], invoke);
