import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuidV4 from "uuid/v4";

import { ADD_CARDS_TO_STACK, RENAME_OBJECT } from "/src/enum/modal.enum";
import { STACK } from "/src/enum/nameable.enum";
import { show } from "/src/action/modal.action";
import { laneStacksCount } from "/src/selector/lane.selector";
import { stackLabel } from "/src/selector/stack.selector";
import { create, remove } from "/src/action/stack.action";
import { addStacks, removeStacks, moveStack } from "/src/action/lane.action";

import StackActions from "./stack-actions";

export default connect(
  createStructuredSelector({
    stackLabel,
    stacksCount: laneStacksCount
  }),
  dispatch => ({
    show: ({ name, props }) => dispatch(show({ name, props })),
    create: ({ id, label }) => dispatch(create({ id, label })),
    remove: ({ ids }) => dispatch(remove({ ids })),
    addStacks: ({ id, stackIds }) => dispatch(addStacks({ id, stackIds })),
    moveStack: ({ fromId, toId, fromStackIndex, toStackIndex }) =>
      dispatch(moveStack({ fromId, toId, fromStackIndex, toStackIndex })),
    removeStacks: ({ id, stackIds }) => dispatch(removeStacks({ id, stackIds }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    showAddCardsToStackModal: () =>
      dispatchProps.show({
        name: ADD_CARDS_TO_STACK,
        props: { stackId: ownProps.stackId }
      }),
    renameStack: () =>
      dispatchProps.show({
        name: RENAME_OBJECT,
        props: {
          nameable: STACK,
          name: stateProps.stackLabel,
          stackId: ownProps.stackId
        }
      }),
    createStack: () =>
      dispatchProps
        .create({
          id: uuidV4(),
          label: "Untitled"
        })
        .then(({ payload: { id: stackId } }) =>
          dispatchProps.addStacks({
            id: ownProps.laneId,
            stackIds: [stackId]
          })
        )
        .then(() =>
          dispatchProps.moveStack({
            fromId: ownProps.laneId,
            toId: ownProps.laneId,
            fromStackIndex: stateProps.stacksCount,
            toStackIndex: ownProps.stackIndex + 1
          })
        ),
    removeStack: () =>
      dispatchProps
        .removeStacks({
          id: ownProps.laneId,
          stackIds: [ownProps.stackId]
        })
        .then(() =>
          dispatchProps.remove({
            ids: [ownProps.stackId]
          })
        )
  })
)(StackActions);
