import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const CREATE = "LANE/CREATE";
export const MOVE = "LANE/MOVE";
export const ADD_STACKS = "LANE/ADD_STACKS";
export const MOVE_STACK = "LANE/MOVE_STACK";

export const create = createPromisedAction(CREATE, ["id", "label"], invoke);

export const move = createPromisedAction(
  MOVE,
  ["fromIndex", "toIndex"],
  invoke
);

export const addStacks = createPromisedAction(
  ADD_STACKS,
  ["id", "stackIds"],
  invoke
);

export const moveStack = createPromisedAction(
  MOVE_STACK,
  ["fromId", "toId", "fromStackIndex", "toStackIndex"],
  invoke
);
