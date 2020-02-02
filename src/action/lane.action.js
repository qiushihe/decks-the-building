import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const CREATE = "LANE/CREATE";

export const create = createPromisedAction(CREATE, ["id", "label"], invoke);
