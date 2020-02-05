import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCards } from "/src/action/stack.action";
import { stackCardCollapsedCardId } from "/src/selector/stack.selector";

import CardMenu from "./card-menu";

export default connect(
  createStructuredSelector({
    collapsed: stackCardCollapsedCardId
  }),
  dispatch => ({
    toggleCards: ({ id, cardIds }) => dispatch(toggleCards({ id, cardIds }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onToggleClicked: () =>
      dispatchProps.toggleCards({
        id: ownProps.stackId,
        cardIds: [ownProps.cardId]
      })
  })
)(CardMenu);
