import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { workspaceLabel } from "/src/selector/workspace.selector";
import { workspaceStatus } from "/src/selector/persistence-status.selector";

import WorkspaceHeader from "./workspace-header";

export default connect(
  createStructuredSelector({
    workspaceLabel,
    persistenceStatus: workspaceStatus
  })
)(WorkspaceHeader);
