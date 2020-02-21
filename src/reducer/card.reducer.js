import { handleActions } from "redux-actions";

import {
  ADD,
  RESTORE,
  RESTORE_CARD_NAMES,
  RESTORE_CARD_SYMBOLS
} from "/src/action/card.action";

import { withPayload } from "/src/util/reducer.util";

import add from "./card/add";
import restore from "./card/restore";
import restoreCardNames from "./card/restore-card-names";
import restoreCardSymbols from "./card/restore-card-symbols";

const initialState = {
  allCards: {},
  allCardNames: [],
  allCardSymbols: []
};

export default handleActions(
  {
    [ADD]: withPayload(add),
    [RESTORE]: withPayload(restore),
    [RESTORE_CARD_NAMES]: withPayload(restoreCardNames),
    [RESTORE_CARD_SYMBOLS]: withPayload(restoreCardSymbols)
  },
  initialState
);
