import Promise from "bluebird";
import flow from "lodash/fp/flow";
import find from "lodash/fp/find";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import identity from "lodash/fp/identity";
import isUndefined from "lodash/fp/isUndefined";
import isFunction from "lodash/fp/isFunction";

import { BOOT, ready } from "/src/action/app.action";
import { RESTORE_CARD_SYMBOLS } from "/src/action/card.action";
import { RESTORE_LOGIN } from "/src/action/s3.action";

export default ({ dispatch }) => {
  const actionCompleted = {
    [BOOT]: false,
    [RESTORE_LOGIN]: false,
    [RESTORE_CARD_SYMBOLS]: false
  };

  let readinessLevel = 0;

  const readinessLevels = [
    { level: 1, ready: () => actionCompleted[BOOT] },
    { level: 2, ready: () => actionCompleted[RESTORE_LOGIN] },
    { level: 3, ready: () => actionCompleted[RESTORE_CARD_SYMBOLS] }
  ];

  const dispatchReadinessIfNeeded = () => {
    flow([
      find({ level: readinessLevel + 1 }),
      get("ready"),
      cond([
        [
          isFunction,
          flow([
            readyFn => readyFn(),
            cond([
              [
                identity,
                flow([
                  () => {
                    readinessLevel += 1;
                  },
                  () => dispatch(ready({ level: readinessLevel }))
                ])
              ]
            ])
          ])
        ]
      ])
    ])(readinessLevels);
  };

  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (!isUndefined(actionCompleted[actionType])) {
        actionCompleted[actionType] = true;
        dispatchReadinessIfNeeded();
      }
    });
  };
};
