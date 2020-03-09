import { handleActions } from "redux-actions";

import {
  ADD,
  SET_CARD_NAMES,
  SET_CARD_SYMBOLS,
  SET_CARDS_DETAIL
} from "/src/action/card.action";

import { withPayload } from "/src/util/reducer.util";

import add from "./card/add";
import setCardNames from "./card/set-card-names";
import setCardSymbols from "./card/set-card-symbols";
import setCardsDetail from "./card/set-cards-detail";

const initialState = {
  allCards: {},
  allCardNames: [],
  allCardSymbols: []
};

export default handleActions(
  {
    [ADD]: withPayload(add),
    [SET_CARD_NAMES]: withPayload(setCardNames),
    [SET_CARD_SYMBOLS]: withPayload(setCardSymbols),
    [SET_CARDS_DETAIL]: withPayload(setCardsDetail)
  },
  initialState
);
