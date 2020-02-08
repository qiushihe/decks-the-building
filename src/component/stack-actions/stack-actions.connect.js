import { connect } from "react-redux";

import { show as showModal } from "/src/action/modal.action";
import { ADD_CARDS_TO_STACK } from "/src/enum/modal.enum";

import StackActions from "./stack-actions";

export default connect(
  null,
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    showAddCardsToStackModal: () =>
      dispatchProps.showModal({
        name: ADD_CARDS_TO_STACK,
        props: { stackId: ownProps.stackId }
      })
  })
)(StackActions);
