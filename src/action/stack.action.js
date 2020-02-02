import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const CREATE = "STACK/CREATE";

export const create = createPromisedAction(
  CREATE,
  ["id", "laneId", "label"],
  invoke
);
