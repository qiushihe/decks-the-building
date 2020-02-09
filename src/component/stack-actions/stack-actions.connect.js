import { connect } from "react-redux";
import uuidV4 from "uuid/v4";

import { ADD_CARDS_TO_STACK } from "/src/enum/modal.enum";
import { show as showModal } from "/src/action/modal.action";

import {
  create as createStackAction,
  remove as removeStackAction
} from "/src/action/stack.action";

import {
  addStacks as addStacksToLaneAction,
  removeStacks as removeStacksFromLaneAction
} from "/src/action/lane.action";

import StackActions from "./stack-actions";

export default connect(
  null,
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props })),
    addStack: ({ id }) =>
      dispatch(
        createStackAction({ id: uuidV4(), label: "Untitled" })
      ).then(({ payload: { id: stackId } }) =>
        dispatch(addStacksToLaneAction({ id, stackIds: [stackId] }))
      ),
    removeStacks: ({ id, stackIds }) =>
      dispatch(removeStacksFromLaneAction({ id, stackIds })).then(() =>
        dispatch(removeStackAction({ ids: stackIds }))
      )
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    showAddCardsToStackModal: () =>
      dispatchProps.showModal({
        name: ADD_CARDS_TO_STACK,
        props: { stackId: ownProps.stackId }
      }),
    addStack: () =>
      dispatchProps.addStack({
        id: ownProps.laneId
      }),
    removeStack: () =>
      dispatchProps.removeStacks({
        id: ownProps.laneId,
        stackIds: [ownProps.stackId]
      })
  })
)(StackActions);
