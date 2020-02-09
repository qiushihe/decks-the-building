import { handleActions } from "redux-actions";

import { UPDATE_LOGIN } from "/src/action/s3.action";
import { withPayload } from "/src/util/reducer.util";

import updateLogin from "./s3/update-login";

const initialState = {
  login: ""
};

export default handleActions(
  {
    [UPDATE_LOGIN]: withPayload(updateLogin)
  },
  initialState
);
