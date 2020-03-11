import { handleActions } from "redux-actions";

import { SHOW, HIDE } from "/src/action/tooltip.action";
import { withPayload } from "/src/util/reducer.util";

import show from "./tooltip/show";
import hide from "./tooltip/hide";

const initialState = {
  activeTooltip: null
};

export default handleActions(
  {
    [SHOW]: withPayload(show),
    [HIDE]: withPayload(hide)
  },
  initialState
);
