import { handleActions } from "redux-actions";

import { CREATE, ADD_CARD, TOGGLE_CARD } from "/src/action/stack.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./stack/create";
import addCard from "./stack/add-card";
import toggleCard from "./stack/toggle-card";

const initialState = {
  allStacks: {}
};

export default handleActions(
  {
    [CREATE]: withPayload(create),
    [ADD_CARD]: withPayload(addCard),
    [TOGGLE_CARD]: withPayload(toggleCard)
  },
  initialState
);
