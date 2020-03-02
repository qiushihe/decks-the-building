import Promise from "bluebird";
import includes from "lodash/fp/includes";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import values from "lodash/fp/values";
import find from "lodash/fp/find";
import filter from "lodash/fp/filter";
import cond from "lodash/fp/cond";
import constant from "lodash/fp/constant";
import stubTrue from "lodash/fp/stubTrue";
import uniq from "lodash/fp/uniq";
import compact from "lodash/fp/compact";
import map from "lodash/fp/map";

import {
  CREATE as CREATE_WORKSPACE,
  RENAME as RENAME_WORKSPACE,
  MOVE_LANE,
  ADD_LANES,
  REMOVE_LANES,
  save
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
  // Workspace actions
  CREATE_WORKSPACE,
  RENAME_WORKSPACE,
  MOVE_LANE,
  ADD_LANES,
  REMOVE_LANES,

  // Lane actions
  RENAME_LANE,
  ADD_STACKS,
  REMOVE_STACKS,
  MOVE_STACK,

  // Stack actions
  RENAME_STACK,
  ADD_CARDS,
  DUPLICATE_CARDS,
  COMBINE_DUPLICATE_CARDS,
  MOVE_CARD,
  CHANGE_CARD_COPIES
];

const workspaceIdsFinder = laneIds =>
  flow([
    get("workspace.allWorkspaces"),
    values,
    filter(
      flow([get("lanes"), find(flow([get("id"), id => includes(id)(laneIds)]))])
    ),
    map(get("id"))
  ]);

const laneIdsFinder = stackIds =>
  flow([
    get("lane.allLanes"),
    values,
    filter(
      flow([
        get("stacks"),
        find(flow([get("id"), id => includes(id)(stackIds)]))
      ])
    ),
    map(get("id"))
  ]);

const getWorkspaceIds = action => state => {
  const { type: actionType } = action;

  if (
    includes(actionType)([
      CREATE_WORKSPACE,
      RENAME_WORKSPACE,
      MOVE_LANE,
      ADD_LANES,
      REMOVE_LANES
    ])
  ) {
    return [getOr(null, "payload.id")(action)];
  } else if (
    includes(actionType)([RENAME_LANE, ADD_STACKS, REMOVE_STACKS, MOVE_STACK])
  ) {
    return flow([
      includes,
      cond([
        [
          includesActionType =>
            includesActionType([RENAME_LANE, ADD_STACKS, REMOVE_STACKS]),
          constant([getOr(null, "payload.id")(action)])
        ],
        [
          includesActionType => includesActionType([MOVE_STACK]),
          constant([
            getOr(null, "payload.fromId")(action),
            getOr(null, "payload.toId")(action)
          ])
        ],
        [stubTrue, constant([])]
      ]),
      uniq,
      workspaceIdsFinder,
      findWorkspaceIds => findWorkspaceIds(state)
    ])(actionType);
  } else if (
    includes(actionType)([
      RENAME_STACK,
      ADD_CARDS,
      DUPLICATE_CARDS,
      COMBINE_DUPLICATE_CARDS,
      MOVE_CARD,
      CHANGE_CARD_COPIES
    ])
  ) {
    return flow([
      includes,
      cond([
        [
          includesActionType =>
            includesActionType([
              RENAME_STACK,
              ADD_CARDS,
              DUPLICATE_CARDS,
              COMBINE_DUPLICATE_CARDS,
              CHANGE_CARD_COPIES
            ]),
          constant([getOr(null, "payload.id")(action)])
        ],
        [
          includesActionType => includesActionType([MOVE_CARD]),
          constant([
            getOr(null, "payload.fromId")(action),
            getOr(null, "payload.toId")(action)
          ])
        ],
        [stubTrue, constant([])]
      ]),
      uniq,
      laneIdsFinder,
      findLaneIds => findLaneIds(state),
      uniq,
      workspaceIdsFinder,
      findWorkspaceIds => findWorkspaceIds(state)
    ])(actionType);
  }

  return [];
};

export default contextualMiddleware({}, ({ dispatch, getState }) => {
  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (includes(actionType)(AUTO_SAVE_ACTIONS)) {
        const { context: { actionLifecycle } = {} } = action;
        const newState = getState();

        if (actionLifecycle !== APP_READY) {
          return flow([
            getWorkspaceIds(action),
            uniq,
            compact,
            map(id => dispatch(save({ id })))
          ])(newState);
        }
      }
    });
  };
});
