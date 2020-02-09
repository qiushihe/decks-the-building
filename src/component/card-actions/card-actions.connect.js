import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCards, changeCardCopies } from "/src/action/stack.action";

import {
  stackCardCountByCardIndex,
  stackCardCollapsedByCardIndex
} from "/src/selector/stack.selector";

import CardActions from "./card-actions";

export default connect(
  createStructuredSelector({
    collapsed: stackCardCollapsedByCardIndex,
    count: stackCardCountByCardIndex
  }),
  dispatch => ({
    toggleCards: ({ id, cardIndices }) =>
      dispatch(toggleCards({ id, cardIndices })),
    changeCardCopies: ({ id, cardIndex, change }) =>
      dispatch(
        changeCardCopies({
          id,
          cardIndex,
          change
        })
      )
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    toggleCard: () =>
      dispatchProps.toggleCards({
        id: ownProps.stackId,
        cardIndices: [ownProps.cardIndex]
      }),
    addCopy: ({ cardIndex }) =>
      dispatchProps.changeCardCopies({
        id: ownProps.stackId,
        cardIndex,
        change: 1
      }),
    subtractCopy: ({ cardIndex }) =>
      dispatchProps.changeCardCopies({
        id: ownProps.stackId,
        cardIndex,
        change: -1
      })
  })
)(CardActions);
