import { handleActions } from "redux-actions";

import {
  CREATE,
  ADD_STACKS,
  REMOVE_STACKS,
  MOVE_STACK
} from "/src/action/lane.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./lane/create";
import addStacks from "./lane/add-stacks";
import removeStacks from "./lane/remove-stacks";
import moveStack from "./lane/move-stack";

const initialState = {
  allLanes: {}
};

export default handleActions(
  {
    [CREATE]: withPayload(create),
    [ADD_STACKS]: withPayload(addStacks),
    [REMOVE_STACKS]: withPayload(removeStacks),
    [MOVE_STACK]: withPayload(moveStack)
  },
  initialState
);
