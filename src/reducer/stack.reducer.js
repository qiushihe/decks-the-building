import { handleActions } from "redux-actions";

import {
  CREATE,
  RESTORE,
  RENAME,
  REMOVE,
  ADD_CARDS,
  TOGGLE_CARDS,
  DUPLICATE_CARDS,
  COMBINE_DUPLICATE_CARDS,
  MOVE_CARD,
  CHANGE_CARD_COPIES
} from "/src/action/stack.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./stack/create";
import restore from "./stack/restore";
import rename from "./stack/rename";
import remove from "./stack/remove";
import addCards from "./stack/add-cards";
import toggleCards from "./stack/toggle-cards";
import duplicateCards from "./stack/duplicate-cards";
import combineDuplicateCards from "./stack/combine-duplicate-cards";
import moveCard from "./stack/move-card";
import changeCardCopies from "./stack/change-card-copies";

const initialState = {
  allStacks: {}
};

export default handleActions(
  {
    [CREATE]: withPayload(create),
    [RESTORE]: withPayload(restore),
    [RENAME]: withPayload(rename),
    [REMOVE]: withPayload(remove),
    [ADD_CARDS]: withPayload(addCards),
    [TOGGLE_CARDS]: withPayload(toggleCards),
    [DUPLICATE_CARDS]: withPayload(duplicateCards),
    [COMBINE_DUPLICATE_CARDS]: withPayload(combineDuplicateCards),
    [MOVE_CARD]: withPayload(moveCard),
    [CHANGE_CARD_COPIES]: withPayload(changeCardCopies)
  },
  initialState
);
