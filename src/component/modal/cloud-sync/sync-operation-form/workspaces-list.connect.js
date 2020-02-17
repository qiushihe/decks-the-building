import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  availableWorkspaceIds,
  selectedWorkspaceId
} from "/src/selector/s3.selector";

import { selectAvailableWorkspace } from "/src/action/s3.action";

import WorkspacesList from "./workspaces-list";

export default connect(
  createStructuredSelector({
    workspaceIds: availableWorkspaceIds,
    selectedWorkspaceId
  }),
  dispatch => ({
    selectWorkspace: ({ id }) => dispatch(selectAvailableWorkspace({ id }))
  })
)(WorkspacesList);
