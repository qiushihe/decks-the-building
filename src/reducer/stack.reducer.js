import { handleActions } from "redux-actions";

import {
  CREATE,
  RESTORE,
  REMOVE,
  ADD_CARDS,
  TOGGLE_CARDS,
  MOVE_CARD,
  CHANGE_COPIES
} from "/src/action/stack.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./stack/create";
import restore from "./stack/restore";
import remove from "./stack/remove";
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
    [RESTORE]: withPayload(restore),
    [REMOVE]: withPayload(remove),
    [ADD_CARDS]: withPayload(addCards),
    [TOGGLE_CARDS]: withPayload(toggleCards),
    [MOVE_CARD]: withPayload(moveCard),
    [CHANGE_COPIES]: withPayload(changeCopies)
  },
  initialState
);
