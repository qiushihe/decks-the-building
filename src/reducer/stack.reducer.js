import { handleActions } from "redux-actions";

import { CREATE, ADD_CARD } from "/src/action/stack.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./stack/create";
import addCard from "./stack/add-card";

const initialState = {
  allStacks: {}
};

export default handleActions(
  {
    [CREATE]: withPayload(create),
    [ADD_CARD]: withPayload(addCard)
  },
  initialState
);
