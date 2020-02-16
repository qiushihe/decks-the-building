import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuidV4 from "uuid/v4";

import { RENAME_OBJECT, REMOVE_OBJECT } from "/src/enum/modal.enum";
import { LANE } from "/src/enum/nameable.enum";
import { show as showModal } from "/src/action/modal.action";
import { workspaceLanesCount } from "/src/selector/workspace.selector";
import { laneLabel, laneStackIds } from "/src/selector/lane.selector";
import { stacksCardsCount } from "/src/selector/stack.selector";
import { create, remove } from "/src/action/lane.action";
import { addLanes, moveLane } from "/src/action/workspace.action";
import { withProps } from "/src/util/selector.util";

import LaneHeader from "./lane-header";

const withStackIds = withProps({
  stackIds: laneStackIds
});

export default connect(
  createStructuredSelector({
    laneLabel,
    laneCardsCount: withStackIds(stacksCardsCount),
    lanesCount: workspaceLanesCount
  }),
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props })),
    create: ({ id, label }) => dispatch(create({ id, label })),
    remove: ({ ids }) => dispatch(remove({ ids })),
    addLanes: ({ id, laneIds }) => dispatch(addLanes({ id, laneIds })),
    moveLane: ({ id, fromLaneIndex, toLaneIndex }) =>
      dispatch(moveLane({ id, fromLaneIndex, toLaneIndex }))
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
      dispatchProps.showModal({
        name: REMOVE_OBJECT,
        props: {
          removable: LANE,
          name: stateProps.laneLabel,
          workspaceId: ownProps.workspaceId,
          laneId: ownProps.laneId
        }
      })
  })
)(LaneHeader);
