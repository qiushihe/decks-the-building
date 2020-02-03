import { createSelector } from "reselect";
import getOr from "lodash/fp/getOr";

import { s3 as s3State } from "./root.selector";

export const login = createSelector(s3State, getOr("", "login"));
