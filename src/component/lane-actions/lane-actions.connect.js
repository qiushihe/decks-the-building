import Promise from "bluebird";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuidV4 from "uuid/v4";

import { RENAME_OBJECT } from "/src/enum/modal.enum";
import { LANE } from "/src/enum/nameable.enum";
import { show as showModal } from "/src/action/modal.action";
import { workspaceLanesCount } from "/src/selector/workspace.selector";
import { laneLabel } from "/src/selector/lane.selector";

import {
  create as createLaneAction,
  remove as removeLaneAction
} from "/src/action/lane.action";

import {
  addLanes as addLanesToWorkspaceAction,
  removeLanes as removeLanesFromWorkspaceAction,
  moveLane
} from "/src/action/workspace.action";

import LaneActions from "./lane-actions";

export default connect(
  createStructuredSelector({
    laneLabel,
    lanesCount: workspaceLanesCount
  }),
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props })),
    addLane: ({ id, fromIndex, toIndex }) =>
      dispatch(createLaneAction({ id: uuidV4(), label: "Untitled" }))
        .then(({ payload: { id: laneId } }) =>
          dispatch(addLanesToWorkspaceAction({ id, laneIds: [laneId] }))
        )
        .then(() =>
          fromIndex !== toIndex
            ? dispatch(
                moveLane({
                  id,
                  fromLaneIndex: fromIndex,
                  toLaneIndex: toIndex
                })
              )
            : Promise.resolve()
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
    showRenameModal: () =>
      dispatchProps.showModal({
        name: RENAME_OBJECT,
        props: {
          nameable: LANE,
          name: stateProps.laneLabel,
          laneId: ownProps.laneId
        }
      }),
    addLane: () =>
      dispatchProps.addLane({
        id: ownProps.workspaceId,
        fromIndex: stateProps.lanesCount,
        toIndex: ownProps.laneIndex + 1
      }),
    removeLane: () =>
      dispatchProps.removeLanes({
        id: ownProps.workspaceId,
        laneIds: [ownProps.laneId]
      })
  })
)(LaneActions);
