import { handleActions } from "redux-actions";

import { ADD } from "/src/action/card.action";
import { withPayload } from "/src/util/reducer.util";

import add from "./card/add";

const initialState = {
  allCards: {}
};

export default handleActions(
  {
    [ADD]: withPayload(add)
  },
  initialState
);
