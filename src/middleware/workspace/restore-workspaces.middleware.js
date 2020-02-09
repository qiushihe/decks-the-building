import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import first from "lodash/fp/first";
import isEmpty from "lodash/fp/isEmpty";
import constant from "lodash/fp/constant";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";

import { getWorkspaceDetailService } from "/src/services/workspace-detail.service";
import { READY } from "/src/action/app.action";
import { LOGGED_IN } from "/src/action/s3.action";
import { add as addCard } from "/src/action/card.action";

import {
  restore as restoreStack,
  addCards as addCardsToStack,
  changeCopies as changeCopiesOfCardInStack
} from "/src/action/stack.action";

import {
  restore as restoreLane,
  addStacks as addStacksToLane
} from "/src/action/lane.action";

import {
  create as createWorkspace,
  restore as restoreWorkspace,
  activate as activateWorkspace,
  addLanes as addLanesToWorkspace
} from "/src/action/workspace.action";

const uncappedReduce = reduce.convert({ cap: false });

export default ({ getState, dispatch }) => next => action => {
  const { type: actionType } = action;

  const restoreStackData = ({ id, label, cards }) => {
    const restoreCardsPromise = flow([
      map(get("name")),
      names =>
        isEmpty(names) ? Promise.resolve() : dispatch(addCard({ names }))
    ])(cards);

    const cardCountChanges = uncappedReduce(
      (result, { name, count }, index) =>
        count - 1 > 0
          ? [
              ...result,
              {
                name,
                cardIndex: index,
                change: count - 1
              }
            ]
          : result,
      []
    )(cards);

    return restoreCardsPromise
      .then(flow([get("payload.cards"), map(get("id"))]))
      .then(cardIds =>
        dispatch(restoreStack({ id, label, cardIds })).then(() =>
          isEmpty(cardIds)
            ? Promise.resolve()
            : dispatch(addCardsToStack({ id, cardIds }))
        )
      )
      .then(() =>
        isEmpty(cardCountChanges)
          ? Promise.resolve()
          : flow([
              map(({ cardIndex, change }) =>
                dispatch(
                  changeCopiesOfCardInStack({
                    id,
                    cardIndex,
                    change
                  })
                )
              ),
              Promise.all
            ])(cardCountChanges)
      )
      .then(constant(id));
  };

  const restoreLaneData = ({ id, label, stacks }) => {
    const restoreStacksPromise = flow([map(restoreStackData), Promise.all])(
      stacks
    );

    return restoreStacksPromise
      .then(stackIds =>
        dispatch(restoreLane({ id, label, stackIds })).then(() =>
          dispatch(addStacksToLane({ id, stackIds }))
        )
      )
      .then(constant(id));
  };

  const restoreWorkspaceData = ({ id, label, lanes }) => {
    const restoreLanesPromise = flow([map(restoreLaneData), Promise.all])(
      lanes
    );

    return restoreLanesPromise
      .then(laneIds =>
        dispatch(restoreWorkspace({ id, label, laneIds })).then(() =>
          isEmpty(laneIds)
            ? Promise.resolve()
            : dispatch(addLanesToWorkspace({ id, laneIds }))
        )
      )
      .then(() => id);
  };

  return Promise.resolve(next(action)).then(() => {
    if (actionType === READY) {
      const workspaceDetailService = getWorkspaceDetailService();

      return workspaceDetailService
        .retrieveAllWorkspaceIds()
        .then(allWorkspaceIds =>
          flow([
            map(workspaceId =>
              workspaceDetailService.retrieveDetailByWorkspaceId(
                getState,
                workspaceId
              )
            ),
            Promise.all
          ])(allWorkspaceIds)
        )
        .then(workspaces =>
          isEmpty(workspaces)
            ? {
                isRestore: false,
                workspaces: map(label => ({
                  id: uuidV4(),
                  label,
                  lanes: []
                }))(["Untitled"])
              }
            : { isRestore: true, workspaces }
        )
        .then(
          flow([
            ({ isRestore, workspaces }) =>
              isRestore
                ? map(restoreWorkspaceData)(workspaces)
                : map(({ id, label }) =>
                    dispatch(createWorkspace({ id, label })).then(constant(id))
                  )(workspaces),
            Promise.all
          ])
        )
        .then(
          flow([
            first,
            workspaceId => dispatch(activateWorkspace({ id: workspaceId }))
          ])
        );
    } else if (actionType === LOGGED_IN) {
      const workspaceDetailService = getWorkspaceDetailService();

      return workspaceDetailService
        .retrieveAllWorkspaceIds()
        .then(allWorkspaceIds =>
          flow([
            map(workspaceId =>
              workspaceDetailService.retrieveDetailByWorkspaceId(
                getState,
                workspaceId
              )
            ),
            Promise.all
          ])(allWorkspaceIds)
        )
        .then(flow([map(restoreWorkspaceData), Promise.all]));
    }
  });
};
