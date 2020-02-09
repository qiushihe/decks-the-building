import Promise from "bluebird";
import { connect } from "react-redux";

import { WORKSPACE, LANE, STACK } from "/src/enum/nameable.enum";
import { rename as renameWorkspace } from "/src/action/workspace.action";
import { rename as renameLane } from "/src/action/lane.action";
import { rename as renameStack } from "/src/action/stack.action";

import RenameObject from "./rename-object";

export default connect(
  null,
  dispatch => ({
    renameWorkspace: ({ id, label }) =>
      dispatch(renameWorkspace({ id, label })),
    renameLane: ({ id, label }) => dispatch(renameLane({ id, label })),
    renameStack: ({ id, label }) => dispatch(renameStack({ id, label }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: fieldValue => {
      return Promise.resolve()
        .then(() => {
          if (ownProps.nameable === WORKSPACE) {
            return dispatchProps.renameWorkspace({
              id: ownProps.workspaceId,
              label: fieldValue
            });
          } else if (ownProps.nameable === LANE) {
            return dispatchProps.renameLane({
              id: ownProps.laneId,
              label: fieldValue
            });
          } else if (ownProps.nameable === STACK) {
            return dispatchProps.renameStack({
              id: ownProps.stackId,
              label: fieldValue
            });
          }
        })
        .then(ownProps.hideModal);
    }
  })
)(RenameObject);
