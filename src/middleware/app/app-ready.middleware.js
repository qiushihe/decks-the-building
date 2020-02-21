import Promise from "bluebird";
import flow from "lodash/fp/flow";
import values from "lodash/fp/values";
import every from "lodash/fp/every";
import cond from "lodash/fp/cond";
import identity from "lodash/fp/identity";
import isUndefined from "lodash/fp/isUndefined";

import { BOOT, ready } from "/src/action/app.action";
import {
  RESTORE_CARD_NAMES,
  RESTORE_CARD_SYMBOLS
} from "/src/action/card.action";

export default ({ dispatch }) => {
  const readyChecks = {
    [BOOT]: false,
    [RESTORE_CARD_NAMES]: false,
    [RESTORE_CARD_SYMBOLS]: false
  };

  const dispatchIfReady = () => {
    flow([values, every(Boolean), cond([[identity, () => dispatch(ready())]])])(
      readyChecks
    );
  };

  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (!isUndefined(readyChecks[actionType])) {
        readyChecks[actionType] = true;
        dispatchIfReady();
      }
    });
  };
};
