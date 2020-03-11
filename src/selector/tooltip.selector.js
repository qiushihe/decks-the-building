import { createSelector } from "reselect";
import get from "lodash/fp/get";
import negate from "lodash/fp/negate";
import isNil from "lodash/fp/isNil";

import { tooltip as tooltipState } from "./root.selector";

export const activeTooltip = createSelector(tooltipState, get("activeTooltip"));

export const hasActiveTooltip = createSelector(activeTooltip, negate(isNil));

export const activeTooltipId = createSelector(activeTooltip, get("id"));

export const activeTooltipName = createSelector(activeTooltip, get("name"));

export const activeTooltipProps = createSelector(activeTooltip, get("props"));
