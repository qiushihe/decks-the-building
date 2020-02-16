import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { stackCardCollapsedByCardIndex } from "/src/selector/stack.selector";

import {
  toggleCards,
  changeCardCopies,
  duplicateCards
} from "/src/action/stack.action";

import CardActions from "./card-actions";

export default connect(
  createStructuredSelector({
    collapsed: stackCardCollapsedByCardIndex
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
      ),
    duplicateCards: ({ id, cardIndices }) =>
      dispatch(
        duplicateCards({
          id,
          cardIndices
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
    addCopy: () =>
      dispatchProps.changeCardCopies({
        id: ownProps.stackId,
        cardIndex: ownProps.cardIndex,
        change: 1
      }),
    subtractCopy: () =>
      dispatchProps.changeCardCopies({
        id: ownProps.stackId,
        cardIndex: ownProps.cardIndex,
        change: -1
      }),
    duplicateCard: () =>
      dispatchProps.duplicateCards({
        id: ownProps.stackId,
        cardIndices: [ownProps.cardIndex]
      })
  })
)(CardActions);
