import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuidV4 from "uuid/v4";

import { RENAME_OBJECT } from "/src/enum/modal.enum";
import { LANE } from "/src/enum/nameable.enum";
import { show as showModal } from "/src/action/modal.action";
import { workspaceLanesCount } from "/src/selector/workspace.selector";
import { laneLabel } from "/src/selector/lane.selector";
import { create, remove } from "/src/action/lane.action";
import { addLanes, removeLanes, moveLane } from "/src/action/workspace.action";

import LaneActions from "./lane-actions";

export default connect(
  createStructuredSelector({
    laneLabel,
    lanesCount: workspaceLanesCount
  }),
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props })),
    create: ({ id, label }) => dispatch(create({ id, label })),
    remove: ({ ids }) => dispatch(remove({ ids })),
    addLanes: ({ id, laneIds }) => dispatch(addLanes({ id, laneIds })),
    moveLane: ({ id, fromLaneIndex, toLaneIndex }) =>
      dispatch(moveLane({ id, fromLaneIndex, toLaneIndex })),
    removeLanes: ({ id, laneIds }) => dispatch(removeLanes({ id, laneIds }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    renameLane: () =>
      dispatchProps.showModal({
        name: RENAME_OBJECT,
        props: {
          nameable: LANE,
          name: stateProps.laneLabel,
          laneId: ownProps.laneId
        }
      }),
    createLane: () =>
      dispatchProps
        .create({
          id: uuidV4(),
          label: "Untitled"
        })
        .then(({ payload: { id: laneId } }) =>
          dispatchProps.addLanes({
            id: ownProps.workspaceId,
            laneIds: [laneId]
          })
        )
        .then(() =>
          dispatchProps.moveLane({
            id: ownProps.workspaceId,
            fromLaneIndex: stateProps.lanesCount,
            toLaneIndex: ownProps.laneIndex + 1
          })
        ),
    removeLane: () =>
      dispatchProps
        .removeLanes({
          id: ownProps.workspaceId,
          laneIds: [ownProps.laneId]
        })
        .then(() =>
          dispatchProps.remove({
            ids: [ownProps.laneId]
          })
        )
  })
)(LaneActions);
