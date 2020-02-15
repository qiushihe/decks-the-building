import { handleActions } from "redux-actions";

import { ADD, RESTORE, RESTORE_CARD_NAMES } from "/src/action/card.action";
import { withPayload } from "/src/util/reducer.util";

import add from "./card/add";
import restore from "./card/restore";
import restoreCardNames from "./card/restore-card-names";

const initialState = {
  allCards: {},
  allCardNames: []
};

export default handleActions(
  {
    [ADD]: withPayload(add),
    [RESTORE]: withPayload(restore),
    [RESTORE_CARD_NAMES]: withPayload(restoreCardNames)
  },
  initialState
);
