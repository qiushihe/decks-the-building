import { handleActions } from "redux-actions";

import {
  ADD,
  RESTORE_FROM_CACHE,
  RESTORE_FROM_S3,
  RESTORE_FROM_SCRYFALL
} from "/src/action/card.action";
import { withPayload } from "/src/util/reducer.util";

import add from "./card/add";
import restore from "./card/restore";

const initialState = {
  allCards: {}
};

export default handleActions(
  {
    [ADD]: withPayload(add),
    [RESTORE_FROM_CACHE]: withPayload(restore),
    [RESTORE_FROM_S3]: withPayload(restore),
    [RESTORE_FROM_SCRYFALL]: withPayload(restore)
  },
  initialState
);
