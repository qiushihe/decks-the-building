import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { availableWorkspaceIds } from "/src/selector/s3.selector";

import WorkspacesList from "./workspaces-list";

export default connect(
  createStructuredSelector({
    workspaceIds: availableWorkspaceIds
  })
)(WorkspacesList);
