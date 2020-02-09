import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { activeWorkspaceLaneIds } from "/src/selector/workspace.selector";
import { moveLane } from "/src/action/workspace.action";

import Lanes from "./lanes";

export default connect(
  createStructuredSelector({
    laneIds: activeWorkspaceLaneIds
  }),
  dispatch => ({
    moveLane: ({ id, fromLaneIndex, toLaneIndex }) =>
      dispatch(
        moveLane({
          id,
          fromLaneIndex,
          toLaneIndex
        })
      )
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    moveLane: ({ fromIndex, toIndex }) =>
      dispatchProps.moveLane({
        id: ownProps.workspaceId,
        fromLaneIndex: fromIndex,
        toLaneIndex: toIndex
      })
  })
)(Lanes);
