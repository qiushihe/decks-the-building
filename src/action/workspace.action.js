import { createPromisedAction } from "/src/util/action.util";
import { invoke } from "/src/util/function.util";

export const CREATE = "WORKSPACE/CREATE";
export const ACTIVATE = "WORKSPACE/ACTIVATE";
export const ADD_LANES = "WORKSPACE/ADD_LANES";
export const MOVE_LANE = "WORKSPACE/MOVE_LANE";

export const create = createPromisedAction(CREATE, ["id", "label"], invoke);

export const activate = createPromisedAction(ACTIVATE, ["id"], invoke);

export const addLanes = createPromisedAction(
  ADD_LANES,
  ["id", "laneIds"],
  invoke
);

export const moveLane = createPromisedAction(
  MOVE_LANE,
  ["id", "fromLaneIndex", "toLaneIndex"],
  invoke
);
