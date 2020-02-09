import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { allWorkspaceIds } from "/src/selector/workspace.selector";

import WorkspaceSelector from "./workspace-selector";

export default connect(
  createStructuredSelector({
    workspaceIds: allWorkspaceIds
  })
)(WorkspaceSelector);
