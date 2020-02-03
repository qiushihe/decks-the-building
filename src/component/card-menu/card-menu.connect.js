import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCard } from "/src/action/stack.action";
import { stackCardCollapsedCardId } from "/src/selector/stack.selector";

import CardMenu from "./card-menu";

export default connect(
  createStructuredSelector({
    collapsed: stackCardCollapsedCardId
  }),
  dispatch => ({
    toggleCard: ({ id, cardId }) => dispatch(toggleCard({ id, cardId }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onToggleClicked: () =>
      dispatchProps.toggleCard({
        id: ownProps.stackId,
        cardId: ownProps.cardId
      })
  })
)(CardMenu);
