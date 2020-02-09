import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import isEmpty from "lodash/fp/isEmpty";
import negate from "lodash/fp/negate";
import size from "lodash/fp/size";

import { fromProps, withProps } from "/src/util/selector.util";

import { workspace as workspaceState } from "./root.selector";

export const allWorkspaceIds = createSelector(
  workspaceState,
  flow([get("allWorkspaces"), map(get("id"))])
);

export const hasWorkspaces = createSelector(allWorkspaceIds, negate(isEmpty));

export const activeWorkspaceId = createSelector(
  workspaceState,
  get("activeWorkspaceId")
);

export const workspaceById = createSelector(
  fromProps(get("workspaceId")),
  workspaceState,
  (workspaceId, state) => get(`allWorkspaces.${workspaceId}`)(state)
);

export const workspaceLabel = createSelector(workspaceById, get("label"));

export const workspaceLaneIds = createSelector(
  workspaceById,
  flow([get("lanes"), map(get("id"))])
);

export const workspaceLanesCount = createSelector(workspaceLaneIds, size);

const withActiveWorkspaceId = withProps({ workspaceId: activeWorkspaceId });

export const activeWorkspaceLaneIds = withActiveWorkspaceId(workspaceLaneIds);
