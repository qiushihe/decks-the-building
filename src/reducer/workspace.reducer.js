import { handleActions } from "redux-actions";

import {
  CREATE,
  ACTIVATE,
  ADD_LANES,
  MOVE_LANE
} from "/src/action/workspace.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./workspace/create";
import activate from "./workspace/activate";
import addLanes from "./workspace/add-lanes";
import moveLanes from "./workspace/move-lane";

const initialState = {
  allWorkspaces: {},
  activeWorkspaceId: null
};

export default handleActions(
  {
    [CREATE]: withPayload(create),
    [ACTIVATE]: withPayload(activate),
    [ADD_LANES]: withPayload(addLanes),
    [MOVE_LANE]: withPayload(moveLanes)
  },
  initialState
);
