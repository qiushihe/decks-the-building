import { handleActions } from "redux-actions";

import {
  CREATE,
  ADD_CARDS,
  TOGGLE_CARDS,
  MOVE_CARD,
  CHANGE_COPIES
} from "/src/action/stack.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./stack/create";
import addCards from "./stack/add-cards";
import toggleCards from "./stack/toggle-cards";
import moveCard from "./stack/move-card";
import changeCopies from "./stack/change-copies";

const initialState = {
  allStacks: {}
};

export default handleActions(
  {
    [CREATE]: withPayload(create),
    [ADD_CARDS]: withPayload(addCards),
    [TOGGLE_CARDS]: withPayload(toggleCards),
    [MOVE_CARD]: withPayload(moveCard),
    [CHANGE_COPIES]: withPayload(changeCopies)
  },
  initialState
);
