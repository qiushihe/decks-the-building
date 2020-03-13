import Promise from "bluebird";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import flow from "lodash/fp/flow";
import first from "lodash/fp/first";
import without from "lodash/fp/without";

import { allWorkspaceIds } from "/src/selector/workspace.selector";
import { WORKSPACE, LANE, STACK } from "/src/enum/object.enum";
import { removeStacks } from "/src/action/lane.action";

import {
  removeLanes,
  remove as removeWorkspace,
  activate as activateWorkspace
} from "/src/action/workspace.action";

import RemoveObject from "./remove-object";

export default connect(
  createStructuredSelector({
    allWorkspaceIds
  }),
  dispatch => ({
    activateWorkspace: ({ id }) => dispatch(activateWorkspace({ id })),
    removeWorkspace: ({ id }) => dispatch(removeWorkspace({ id })),
    removeLane: ({ workspaceId, laneId }) =>
      dispatch(removeLanes({ id: workspaceId, laneIds: [laneId] })),
    removeStack: ({ laneId, stackId }) =>
      dispatch(removeStacks({ id: laneId, stackIds: [stackId] }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: () => {
      return Promise.resolve()
        .then(() => {
          if (ownProps.removable === WORKSPACE) {
            return dispatchProps
              .removeWorkspace({
                id: ownProps.workspaceId
              })
              .then(() =>
                flow([
                  without([ownProps.workspaceId]),
                  first,
                  workspaceId =>
                    dispatchProps.activateWorkspace({ id: workspaceId })
                ])(stateProps.allWorkspaceIds)
              );
          } else if (ownProps.removable === LANE) {
            return dispatchProps.removeLane({
              workspaceId: ownProps.workspaceId,
              laneId: ownProps.laneId
            });
          } else if (ownProps.removable === STACK) {
            return dispatchProps.removeStack({
              laneId: ownProps.laneId,
              stackId: ownProps.stackId
            });
          }
        })
        .then(ownProps.hideModal);
    }
  })
)(RemoveObject);
