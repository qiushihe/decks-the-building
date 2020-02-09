import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { boot as appBoot } from "/src/action/app.action";
import { activeWorkspaceId } from "/src/selector/workspace.selector";

import Application from "./application";

export default connect(
  createStructuredSelector({
    workspaceId: activeWorkspaceId
  }),
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
