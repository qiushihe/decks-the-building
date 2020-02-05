import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCards } from "/src/action/stack.action";

import {
  stackCardCountByCardIndex,
  stackCardCollapsedByCardIndex
} from "/src/selector/stack.selector";

import CardActions from "./card-actions";

export default connect(
  createStructuredSelector({
    collapsed: stackCardCollapsedByCardIndex,
    count: stackCardCountByCardIndex,
  }),
  dispatch => ({
    toggleCards: ({ id, cardIndices }) => dispatch(toggleCards({ id, cardIndices }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onToggleClicked: () =>
      dispatchProps.toggleCards({
        id: ownProps.stackId,
        cardIndices: [ownProps.cardIndex]
      })
  })
)(CardActions);
