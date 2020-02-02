import { handleActions } from "redux-actions";

import { ADD, UPDATE, RESTORE } from "/src/action/card.action";
import { withPayload } from "/src/util/reducer.util";

import add from "./card/add";
import update from "./card/update";
import restore from "./card/restore";

const initialState = {
  allCards: {}
};

export default handleActions(
  {
    [ADD]: withPayload(add),
    [UPDATE]: withPayload(update),
    [RESTORE]: withPayload(restore)
  },
  initialState
);
