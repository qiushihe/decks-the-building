import { handleActions } from "redux-actions";

import {
  ADD,
  SET_CARD_NAMES,
  SET_CARD_SYMBOLS,
  SET_CARDS_DETAIL,
  ADD_FAILED_CARD_IDS
} from "/src/action/card.action";

import { withPayload } from "/src/util/reducer.util";

import add from "./card/add";
import setCardNames from "./card/set-card-names";
import setCardSymbols from "./card/set-card-symbols";
import setCardsDetail from "./card/set-cards-detail";
import addFailedCards from "./card/add-failed-card-ids";

const initialState = {
  allCards: {},
  allCardNames: [],
  allCardSymbols: [],
  allFailedCardIds: []
};

export default handleActions(
  {
    [ADD]: withPayload(add),
    [SET_CARD_NAMES]: withPayload(setCardNames),
    [SET_CARD_SYMBOLS]: withPayload(setCardSymbols),
    [SET_CARDS_DETAIL]: withPayload(setCardsDetail),
    [ADD_FAILED_CARD_IDS]: withPayload(addFailedCards)
  },
  initialState
);
