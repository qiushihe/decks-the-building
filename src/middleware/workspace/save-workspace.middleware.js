import Promise from "bluebird";
import map from "lodash/fp/map";

import { SAVE } from "/src/action/workspace.action";
import { withProps } from "/src/util/selector.util";
import { getWorkspaceDetailService } from "/src/services/workspace-detail.service";

import { landLabel, laneStackIds } from "/src/selector/lane.selector";
import { stackLabel, stackCardEntries } from "/src/selector/stack.selector";
import { cardName } from "/src/selector/card.selector";

import {
  workspaceLabel,
  workspaceLaneIds
} from "/src/selector/workspace.selector";

export default ({ getState }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === SAVE) {
      const newState = getState();

      const {
        payload: { id: workspaceId }
      } = action;

      const workspaceData = {
        id: workspaceId,
        label: withProps({ workspaceId })(workspaceLabel)(newState),
        lanes: map(laneId => ({
          id: laneId,
          label: withProps({ laneId })(landLabel)(newState),
          stacks: map(stackId => ({
            id: stackId,
            label: withProps({ stackId })(stackLabel)(newState),
            cards: map(({ id: cardId, count }) => ({
              name: withProps({ cardId })(cardName)(newState),
              count
            }))(withProps({ stackId })(stackCardEntries)(newState))
          }))(withProps({ laneId })(laneStackIds)(newState))
        }))(withProps({ workspaceId })(workspaceLaneIds)(newState))
      };

      return getWorkspaceDetailService().storeDetailByWorkspaceId(
        getState,
        workspaceId,
        workspaceData
      );
    }
  });
};
