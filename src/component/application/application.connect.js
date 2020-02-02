import { connect } from "react-redux";

import { boot as appBoot } from "/src/action/app.action";

import Application from "./application";

export default connect(
  null,
  dispatch => ({
    appBoot: () => dispatch(appBoot())
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onMount: dispatchProps.appBoot
  })
)(Application);
