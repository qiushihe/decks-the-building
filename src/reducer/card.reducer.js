import { handleActions } from "redux-actions";

import {
  ADD,
  SET_CARD_DETAIL,
  SET_CARD_NAMES,
  SET_CARD_SYMBOLS
} from "/src/action/card.action";

import { withPayload } from "/src/util/reducer.util";

import add from "./card/add";
import setCardDetail from "./card/set-card-detail";
import setCardNames from "./card/set-card-names";
import setCardSymbols from "./card/set-card-symbols";

const initialState = {
  allCards: {},
  allCardNames: [],
  allCardSymbols: []
};

export default handleActions(
  {
    [ADD]: withPayload(add),
    [SET_CARD_DETAIL]: withPayload(setCardDetail),
    [SET_CARD_NAMES]: withPayload(setCardNames),
    [SET_CARD_SYMBOLS]: withPayload(setCardSymbols)
  },
  initialState
);
