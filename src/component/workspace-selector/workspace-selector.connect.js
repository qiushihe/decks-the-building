import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { allWorkspaceIds } from "/src/selector/workspace.selector";
import { activate } from "/src/action/workspace.action";

import WorkspaceSelector from "./workspace-selector";

export default connect(
  createStructuredSelector({
    workspaceIds: allWorkspaceIds
  }),
  dispatch => ({
    activate: ({ id }) => dispatch(activate({ id }))
  })
)(WorkspaceSelector);
