import { connect } from "react-redux";
import uuidV4 from "uuid/v4";

import { show as showModal } from "/src/action/modal.action";

import {
  create as createLaneAction,
  remove as removeLaneAction
} from "/src/action/lane.action";

import {
  addLanes as addLanesToWorkspaceAction,
  removeLanes as removeLanesFromWorkspaceAction
} from "/src/action/workspace.action";

import LaneActions from "./lane-actions";

export default connect(
  null,
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props })),
    addLane: ({ id }) =>
      dispatch(
        createLaneAction({ id: uuidV4(), label: "Untitled" })
      ).then(({ payload: { id: laneId } }) =>
        dispatch(addLanesToWorkspaceAction({ id, laneIds: [laneId] }))
      ),
    removeLanes: ({ id, laneIds }) =>
      dispatch(
        removeLanesFromWorkspaceAction({
          id,
          laneIds
        })
      ).then(() => dispatch(removeLaneAction({ ids: laneIds })))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    addLane: () =>
      dispatchProps.addLane({
        id: ownProps.workspaceId
      }),
    removeLane: () =>
      dispatchProps.removeLanes({
        id: ownProps.workspaceId,
        laneIds: [ownProps.laneId]
      })
  })
)(LaneActions);
