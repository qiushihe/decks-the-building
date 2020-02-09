import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const CREATE = "WORKSPACE/CREATE";
export const RESTORE = "WORKSPACE/RESTORE";
export const RENAME = "WORKSPACE/RENAME";
export const REMOVE = "WORKSPACE/REMOVE";
export const ACTIVATE = "WORKSPACE/ACTIVATE";
export const SAVE = "WORKSPACE/SAVE";
export const MOVE_LANE = "WORKSPACE/MOVE_LANE";
export const ADD_LANES = "WORKSPACE/ADD_LANES";
export const REMOVE_LANES = "WORKSPACE/REMOVE_LANES";

export const create = createPromisedAction(CREATE, ["id", "label"], invoke);

export const restore = createPromisedAction(RESTORE, ["id", "label"], invoke);

export const rename = createPromisedAction(RENAME, ["id", "label"], invoke);

export const remove = createPromisedAction(REMOVE, ["id"], invoke);

export const activate = createPromisedAction(ACTIVATE, ["id"], invoke);

export const save = createPromisedAction(SAVE, ["id"], invoke);

export const moveLane = createPromisedAction(
  MOVE_LANE,
  ["id", "fromLaneIndex", "toLaneIndex"],
  invoke
);

export const addLanes = createPromisedAction(
  ADD_LANES,
  ["id", "laneIds"],
  invoke
);

export const removeLanes = createPromisedAction(
  REMOVE_LANES,
  ["id", "laneIds"],
  invoke
);
