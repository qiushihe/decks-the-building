import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const ADD = "CARD/ADD";

export const add = createPromisedAction(ADD, ["name"], invoke);
