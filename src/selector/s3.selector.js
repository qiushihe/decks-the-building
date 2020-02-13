import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";
import find from "lodash/fp/find";
import eq from "lodash/fp/eq";

import { fromProps } from "/src/util/selector.util";

import { s3 as s3State } from "./root.selector";

export const login = createSelector(s3State, getOr("", "login"));

export const hasLogin = createSelector(login, negate(isEmpty));

export const availableWorkspaces = createSelector(
  s3State,
  get("availableWorkspaces")
);

export const availableWorkspaceIds = createSelector(
  availableWorkspaces,
  flow([map(get("id"))])
);

export const availableWorkspaceById = createSelector(
  fromProps(get("workspaceId")),
  availableWorkspaces,
  (workspaceId, workspaces) => find({ id: workspaceId })(workspaces)
);

export const availableWorkspaceLabel = createSelector(
  availableWorkspaceById,
  get("label")
);

export const selectedWorkspaceId = createSelector(
  s3State,
  get("selectedWorkspaceId")
);

export const availableWorkspaceIsSelected = createSelector(
  fromProps(get("workspaceId")),
  selectedWorkspaceId,
  eq
);
