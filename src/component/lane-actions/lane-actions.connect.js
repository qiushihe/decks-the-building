import { connect } from "react-redux";

import { show as showModal } from "/src/action/modal.action";

import LaneActions from "./lane-actions";

export default connect(
  null,
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  })
)(LaneActions);
