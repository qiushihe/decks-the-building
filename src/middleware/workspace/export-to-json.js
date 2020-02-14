import Promise from "bluebird";
import map from "lodash/fp/map";

import { withProps } from "/src/util/selector.util";

import { laneLabel, laneStackIds } from "/src/selector/lane.selector";
import { stackLabel, stackCardEntries } from "/src/selector/stack.selector";
import { cardName } from "/src/selector/card.selector";

import {
  workspaceLabel,
  workspaceLaneIds
} from "/src/selector/workspace.selector";

export default (state, workspaceId) =>
  Promise.resolve({
    id: workspaceId,
    label: withProps({ workspaceId })(workspaceLabel)(state),
    lanes: map(laneId => ({
      id: laneId,
      label: withProps({ laneId })(laneLabel)(state),
      stacks: map(stackId => ({
        id: stackId,
        label: withProps({ stackId })(stackLabel)(state),
        cards: map(({ id: cardId, count }) => ({
          name: withProps({ cardId })(cardName)(state),
          count
        }))(withProps({ stackId })(stackCardEntries)(state))
      }))(withProps({ laneId })(laneStackIds)(state))
    }))(withProps({ workspaceId })(workspaceLaneIds)(state))
  });
