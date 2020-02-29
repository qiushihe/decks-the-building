import { handleActions } from "redux-actions";

import { withPayload } from "/src/util/reducer.util";

import {
  SET_LOGIN,
  CLEAR_LOGIN,
  RESTORE_LOGIN,
  CLEAR_AVAILABLE_WORKSPACES,
  ADD_AVAILABLE_WORKSPACE,
  SELECT_AVAILABLE_WORKSPACE
} from "/src/action/s3.action";

import setLogin from "./s3/set-login";
import clearLogin from "./s3/clear-login";
import restoreLogin from "./s3/restore-login";
import clearAvailableWorkspaces from "./s3/clear-available-workspaces";
import addAvailableWorkspace from "./s3/add-available-workspace";
import selectAvailableWorkspace from "./s3/select-available-workspace";

const initialState = {
  login: "",
  selectedWorkspaceId: null,
  availableWorkspaces: []
};

export default handleActions(
  {
    [SET_LOGIN]: withPayload(setLogin),
    [CLEAR_LOGIN]: withPayload(clearLogin),
    [RESTORE_LOGIN]: withPayload(restoreLogin),
    [CLEAR_AVAILABLE_WORKSPACES]: withPayload(clearAvailableWorkspaces),
    [ADD_AVAILABLE_WORKSPACE]: withPayload(addAvailableWorkspace),
    [SELECT_AVAILABLE_WORKSPACE]: withPayload(selectAvailableWorkspace)
  },
  initialState
);
