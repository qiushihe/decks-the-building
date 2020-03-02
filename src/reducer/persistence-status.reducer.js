import { handleActions } from "redux-actions";

import { SET_STATUS } from "/src/action/persistence-status.action";
import { withPayload } from "/src/util/reducer.util";

import setStatus from "./persistence-status/set-status";

const initialState = {
  workspaces: {}
};

export default handleActions(
  {
    [SET_STATUS]: withPayload(setStatus)
  },
  initialState
);
