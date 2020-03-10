import { combineReducers } from "redux";

import s3 from "./s3.reducer";
import card from "./card.reducer";
import stack from "./stack.reducer";
import lane from "./lane.reducer";
import workspace from "./workspace.reducer";
import modal from "./modal.reducer";
import tooltip from "./tooltip.reducer";
import persistenceStatus from "./persistence-status.reducer";

export default () =>
  combineReducers({
    s3,
    card,
    stack,
    lane,
    workspace,
    modal,
    tooltip,
    persistenceStatus
  });
