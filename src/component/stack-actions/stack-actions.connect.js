import Promise from "bluebird";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuidV4 from "uuid/v4";

import { ADD_CARDS_TO_STACK, RENAME_OBJECT } from "/src/enum/modal.enum";
import { STACK } from "/src/enum/nameable.enum";
import { show as showModal } from "/src/action/modal.action";
import { laneStacksCount } from "/src/selector/lane.selector";
import { stackLabel } from "/src/selector/stack.selector";

import {
  create as createStackAction,
  remove as removeStackAction
} from "/src/action/stack.action";

import {
  addStacks as addStacksToLaneAction,
  removeStacks as removeStacksFromLaneAction,
  moveStack
} from "/src/action/lane.action";

import StackActions from "./stack-actions";

export default connect(
  createStructuredSelector({
    stackLabel,
    stacksCount: laneStacksCount
  }),
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props })),
    addStack: ({ id, fromIndex, toIndex }) =>
      dispatch(createStackAction({ id: uuidV4(), label: "Untitled" }))
        .then(({ payload: { id: stackId } }) =>
          dispatch(addStacksToLaneAction({ id, stackIds: [stackId] }))
        )
        .then(() =>
          fromIndex !== toIndex
            ? dispatch(
                moveStack({
                  fromId: id,
                  toId: id,
                  fromStackIndex: fromIndex,
                  toStackIndex: toIndex
                })
              )
            : Promise.resolve()
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
    showRenameModal: () =>
      dispatchProps.showModal({
        name: RENAME_OBJECT,
        props: {
          nameable: STACK,
          name: stateProps.stackLabel,
          stackId: ownProps.stackId
        }
      }),
    addStack: () =>
      dispatchProps.addStack({
        id: ownProps.laneId,
        fromIndex: stateProps.stacksCount,
        toIndex: ownProps.stackIndex + 1
      }),
    removeStack: () =>
      dispatchProps.removeStacks({
        id: ownProps.laneId,
        stackIds: [ownProps.stackId]
      })
  })
)(StackActions);
