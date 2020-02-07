import { handleActions } from "redux-actions";

import { CREATE, ADD_STACKS } from "/src/action/lane.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./lane/create";
import addStacks from "./lane/add-stacks";

const initialState = {
  allLanes: {}
};

export default handleActions(
  {
    [CREATE]: withPayload(create),
    [ADD_STACKS]: withPayload(addStacks)
  },
  initialState
);
