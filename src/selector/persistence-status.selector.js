import { createSelector } from "reselect";
import get from "lodash/fp/get";

import { fromProps } from "/src/util/selector.util";

import { persistenceStatus as persistenceStatusState } from "./root.selector";

export const workspaces = createSelector(
  persistenceStatusState,
  get("workspaces")
);

export const workspaceStatus = createSelector(
  fromProps(get("workspaceId")),
  workspaces,
  (workspaceId, workspaces) => get(workspaceId)(workspaces)
);
