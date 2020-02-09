import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import isEmpty from "lodash/fp/isEmpty";
import negate from "lodash/fp/negate";

import { fromProps, withProps } from "/src/util/selector.util";

import { workspace as workspaceState } from "./root.selector";

export const hasWorkspaces = createSelector(
  workspaceState,
  flow([get("allWorkspaces"), negate(isEmpty)])
);

export const activeWorkspaceId = createSelector(
  workspaceState,
  get("activeWorkspaceId")
);

export const workspaceById = createSelector(
  fromProps(get("workspaceId")),
  workspaceState,
  (workspaceId, state) => get(`allWorkspaces.${workspaceId}`)(state)
);

export const workspaceLaneIds = createSelector(
  workspaceById,
  flow([get("lanes"), map(get("id"))])
);

const withActiveWorkspaceId = withProps({ workspaceId: activeWorkspaceId });

export const activeWorkspaceLaneIds = withActiveWorkspaceId(workspaceLaneIds);
