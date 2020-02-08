import { handleActions } from "redux-actions";

import { SHOW, HIDE } from "/src/action/modal.action";
import { withPayload } from "/src/util/reducer.util";

import show from "./modal/show";
import hide from "./modal/hide";

const initialState = {
  activeModal: null
};

export default handleActions(
  {
    [SHOW]: withPayload(show),
    [HIDE]: withPayload(hide)
  },
  initialState
);
