import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import map from "lodash/fp/map";

import {
  workspaceLabel,
  workspaceLaneIds
} from "/src/selector/workspace.selector";

import {
  EXPORT_WORKSPACE,
  clearAvailableWorkspaces,
  fetchAvailableWorkspaces
} from "/src/action/s3.action";

import { laneLabel, laneStackIds } from "/src/selector/lane.selector";
import { stackLabel, stackCardEntries } from "/src/selector/stack.selector";
import { cardName } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";
import { getSaveToLocalService } from "/src/service/workspace/save-to-remote.service";

export default ({ getState, dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === EXPORT_WORKSPACE) {
      const newState = getState();

      const {
        payload: { localId, remoteId }
      } = action;

      const workspaceData = {
        id: remoteId || uuidV4(),
        label: withProps({ workspaceId: localId })(workspaceLabel)(newState),
        lanes: map(laneId => ({
          id: laneId,
          label: withProps({ laneId })(laneLabel)(newState),
          stacks: map(stackId => ({
            id: stackId,
            label: withProps({ stackId })(stackLabel)(newState),
            cards: map(({ id: cardId, count }) => ({
              name: withProps({ cardId })(cardName)(newState),
              count
            }))(withProps({ stackId })(stackCardEntries)(newState))
          }))(withProps({ laneId })(laneStackIds)(newState))
        }))(withProps({ workspaceId: localId })(workspaceLaneIds)(newState))
      };

      return getSaveToLocalService()
        .save(workspaceData.id, workspaceData)
        .then(() =>
          dispatch(clearAvailableWorkspaces()).then(() =>
            dispatch(fetchAvailableWorkspaces())
          )
        );
    }
  });
};
