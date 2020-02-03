import { handleActions } from "redux-actions";

import { UPDATE_LOGIN, RESTORE_LOGIN } from "/src/action/s3.action";
import { withPayload } from "/src/util/reducer.util";

import updateLogin from "./s3/update-login";
import restoreLogin from "./s3/restore-login";

const initialState = {
  login: ""
};

export default handleActions(
  {
    [UPDATE_LOGIN]: withPayload(updateLogin),
    [RESTORE_LOGIN]: withPayload(restoreLogin)
  },
  initialState
);
