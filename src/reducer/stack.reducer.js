import { handleActions } from "redux-actions";

import { CREATE, ADD_CARDS, TOGGLE_CARDS } from "/src/action/stack.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./stack/create";
import addCards from "./stack/add-cards";
import toggleCards from "./stack/toggle-cards";

const initialState = {
  allStacks: {}
};

export default handleActions(
  {
    [CREATE]: withPayload(create),
    [ADD_CARDS]: withPayload(addCards),
    [TOGGLE_CARDS]: withPayload(toggleCards)
  },
  initialState
);
