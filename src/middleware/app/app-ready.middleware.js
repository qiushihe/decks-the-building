import Promise from "bluebird";
import flow from "lodash/fp/flow";
import find from "lodash/fp/find";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import identity from "lodash/fp/identity";
import isUndefined from "lodash/fp/isUndefined";
import isFunction from "lodash/fp/isFunction";
import constant from "lodash/fp/constant";

import { BOOT, ready } from "/src/action/app.action";
import { SET_CARD_SYMBOLS } from "/src/action/card.action";
import { SET_LOGIN } from "/src/action/s3.action";
import { contextualMiddleware } from "/src/util/middleware.util";
import { APP_READY } from "/src/enum/action-lifecycle.enum";
import {
  LEVEL_0,
  LEVEL_1,
  LEVEL_2,
  LEVEL_3
} from "/src/enum/app-readiness.enum";

export default contextualMiddleware({}, ({ dispatch }) => {
  const actionReceived = {
    [BOOT]: false,
    [SET_LOGIN]: false,
    [SET_CARD_SYMBOLS]: false
  };

  const markAsReceived = ({ type }) => {
    actionReceived[type] = true;
  };

  const actionReceivers = {
    [SET_LOGIN]: action => {
      const { context: { actionLifecycle } = {} } = action;
      if (actionLifecycle === APP_READY) {
        markAsReceived(action);
      }
    }
  };

  const receiveAction = action => {
    const { type } = action;
    const receiverFn = actionReceivers[type] || markAsReceived;
    receiverFn(action);
  };

  let levelIndex = 0;

  const ALL_LEVELS = [LEVEL_0, LEVEL_1, LEVEL_2, LEVEL_3];

  const readinessLevels = [
    { level: LEVEL_0, ready: constant(true) },
    { level: LEVEL_1, ready: () => actionReceived[BOOT] },
    { level: LEVEL_2, ready: () => actionReceived[SET_LOGIN] },
    { level: LEVEL_3, ready: () => actionReceived[SET_CARD_SYMBOLS] }
  ];

  const dispatchReadinessIfNeeded = () => {
    flow([
      find({ level: ALL_LEVELS[levelIndex + 1] }),
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
                    levelIndex += 1;
                  },
                  () => dispatch(ready({ level: ALL_LEVELS[levelIndex] }))
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
      if (!isUndefined(actionReceived[actionType])) {
        receiveAction(action);
        dispatchReadinessIfNeeded();
      }
    });
  };
});
