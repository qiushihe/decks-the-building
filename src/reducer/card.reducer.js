import { handleActions } from "redux-actions";

import { ADD, RESTORE } from "/src/action/card.action";
import { withPayload } from "/src/util/reducer.util";

import add from "./card/add";
import restore from "./card/restore";

const initialState = {
  allCards: {}
};

export default handleActions(
  {
    [ADD]: withPayload(add),
    [RESTORE]: withPayload(restore)
  },
  initialState
);
