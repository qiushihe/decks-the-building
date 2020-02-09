import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const CREATE = "LANE/CREATE";
export const RESTORE = "LANE/RESTORE";
export const RENAME = "LANE/RENAME";
export const REMOVE = "LANE/REMOVE";
export const MOVE = "LANE/MOVE";
export const ADD_STACKS = "LANE/ADD_STACKS";
export const REMOVE_STACKS = "LANE/REMOVE_STACKS";
export const MOVE_STACK = "LANE/MOVE_STACK";

export const create = createPromisedAction(CREATE, ["id", "label"], invoke);

export const restore = createPromisedAction(RESTORE, ["id", "label"], invoke);

export const rename = createPromisedAction(RENAME, ["id", "label"], invoke);

export const remove = createPromisedAction(REMOVE, ["ids"], invoke);

export const addStacks = createPromisedAction(
  ADD_STACKS,
  ["id", "stackIds"],
  invoke
);

export const removeStacks = createPromisedAction(
  REMOVE_STACKS,
  ["id", "stackIds"],
  invoke
);

export const moveStack = createPromisedAction(
  MOVE_STACK,
  ["fromId", "toId", "fromStackIndex", "toStackIndex"],
  invoke
);
