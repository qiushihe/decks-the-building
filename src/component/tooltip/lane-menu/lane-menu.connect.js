import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuidV4 from "uuid/v4";
import isFunction from "lodash/fp/isFunction";

import { RENAME_OBJECT, REMOVE_OBJECT } from "/src/enum/modal.enum";
import { LANE } from "/src/enum/object.enum";
import { show as showModal } from "/src/action/modal.action";
import { workspaceLanesCount } from "/src/selector/workspace.selector";
import { laneLabel } from "/src/selector/lane.selector";
import { create } from "/src/action/lane.action";
import { addLanes, moveLane } from "/src/action/workspace.action";

import LaneMenu from "./lane-menu";

export default connect(
  createStructuredSelector({
    laneLabel,
    lanesCount: workspaceLanesCount
  }),
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props })),
    create: ({ id, label }) => dispatch(create({ id, label })),
    addLanes: ({ id, laneIds }) => dispatch(addLanes({ id, laneIds })),
    moveLane: ({ id, fromLaneIndex, toLaneIndex }) =>
      dispatch(moveLane({ id, fromLaneIndex, toLaneIndex }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    renameLane: () => {
      if (isFunction(ownProps.hideTooltip)) {
        ownProps.hideTooltip();
      }

      dispatchProps.showModal({
        name: RENAME_OBJECT,
        props: {
          nameable: LANE,
          name: stateProps.laneLabel,
          laneId: ownProps.laneId
        }
      });
    },
    createLane: () => {
      if (isFunction(ownProps.hideTooltip)) {
        ownProps.hideTooltip();
      }

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
        );
    },
    removeLane: () => {
      if (isFunction(ownProps.hideTooltip)) {
        ownProps.hideTooltip();
      }

      dispatchProps.showModal({
        name: REMOVE_OBJECT,
        props: {
          removable: LANE,
          name: stateProps.laneLabel,
          workspaceId: ownProps.workspaceId,
          laneId: ownProps.laneId
        }
      });
    }
  })
)(LaneMenu);
