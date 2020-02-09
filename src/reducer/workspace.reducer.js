import { handleActions } from "redux-actions";

import {
  CREATE,
  RESTORE,
  RENAME,
  REMOVE,
  ACTIVATE,
  MOVE_LANE,
  ADD_LANES,
  REMOVE_LANES
} from "/src/action/workspace.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./workspace/create";
import restore from "./workspace/restore";
import rename from "./workspace/rename";
import remove from "./workspace/remove";
import activate from "./workspace/activate";
import moveLanes from "./workspace/move-lane";
import addLanes from "./workspace/add-lanes";
import removeLanes from "./workspace/remove-lanes";

const initialState = {
  allWorkspaces: {},
  activeWorkspaceId: null
};

export default handleActions(
  {
    [CREATE]: withPayload(create),
    [RESTORE]: withPayload(restore),
    [RENAME]: withPayload(rename),
    [REMOVE]: withPayload(remove),
    [ACTIVATE]: withPayload(activate),
    [MOVE_LANE]: withPayload(moveLanes),
    [ADD_LANES]: withPayload(addLanes),
    [REMOVE_LANES]: withPayload(removeLanes)
  },
  initialState
);
