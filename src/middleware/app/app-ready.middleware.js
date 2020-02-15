import Promise from "bluebird";
import flow from "lodash/fp/flow";
import values from "lodash/fp/values";
import every from "lodash/fp/every";
import cond from "lodash/fp/cond";
import identity from "lodash/fp/identity";

import { BOOT, ready } from "/src/action/app.action";
import { RESTORE_CARD_NAMES } from "/src/action/card.action";

export default ({ dispatch }) => {
  const readyChecks = {
    [BOOT]: false,
    [RESTORE_CARD_NAMES]: false
  };

  const dispatchIfReady = () => {
    flow([values, every(Boolean), cond([[identity, () => dispatch(ready())]])])(
      readyChecks
    );
  };

  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === BOOT) {
        readyChecks[BOOT] = true;
        dispatchIfReady();
      } else if (actionType === RESTORE_CARD_NAMES) {
        readyChecks[RESTORE_CARD_NAMES] = true;
        dispatchIfReady();
      }
    });
  };
};
