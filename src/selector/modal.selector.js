import { createSelector } from "reselect";
import get from "lodash/fp/get";
import negate from "lodash/fp/negate";
import isNil from "lodash/fp/isNil";

import { modal as modalState } from "./root.selector";

export const activeModal = createSelector(modalState, get("activeModal"));

export const hasActiveModal = createSelector(activeModal, negate(isNil));

export const activeModalName = createSelector(activeModal, get("name"));

export const activeModalProps = createSelector(activeModal, get("props"));
