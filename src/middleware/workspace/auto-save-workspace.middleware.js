import Promise from "bluebird";
import includes from "lodash/fp/includes";

import {
  CREATE as CREATE_WORKSPACE,
  RENAME as RENAME_WORKSPACE,
  MOVE_LANE,
  ADD_LANES,
  REMOVE_LANES
} from "/src/action/workspace.action";

import {
  RENAME as RENAME_LANE,
  ADD_STACKS,
  REMOVE_STACKS,
  MOVE_STACK
} from "/src/action/lane.action";

import {
  RENAME as RENAME_STACK,
  ADD_CARDS,
  DUPLICATE_CARDS,
  COMBINE_DUPLICATE_CARDS,
  MOVE_CARD,
  CHANGE_CARD_COPIES
} from "/src/action/stack.action";

import { contextualMiddleware } from "/src/util/middleware.util";
import { APP_READY } from "/src/enum/action-lifecycle.enum";

const AUTO_SAVE_ACTIONS = [
  CREATE_WORKSPACE,
  RENAME_WORKSPACE,
  MOVE_LANE,
  ADD_LANES,
  REMOVE_LANES,
  RENAME_LANE,
  ADD_STACKS,
  REMOVE_STACKS,
  MOVE_STACK,
  RENAME_STACK,
  ADD_CARDS,
  DUPLICATE_CARDS,
  COMBINE_DUPLICATE_CARDS,
  MOVE_CARD,
  CHANGE_CARD_COPIES
];

export default contextualMiddleware({}, () => {
  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (includes(actionType)(AUTO_SAVE_ACTIONS)) {
        const { context: { actionLifecycle } = {} } = action;

        if (actionLifecycle !== APP_READY) {
          console.log(actionType);
        }
      }
    });
  };
});
