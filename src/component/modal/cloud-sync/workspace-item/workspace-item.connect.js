import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectAvailableWorkspace } from "/src/action/s3.action";

import {
  availableWorkspaceLabel,
  availableWorkspaceIsSelected
} from "/src/selector/s3.selector";

import WorkspaceItem from "./workspace-item";

export default connect(
  createStructuredSelector({
    label: availableWorkspaceLabel,
    isSelected: availableWorkspaceIsSelected
  }),
  dispatch => ({
    selectWorkspace: ({ id }) => dispatch(selectAvailableWorkspace({ id }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    selectWorkspace: () =>
      dispatchProps.selectWorkspace({
        id: ownProps.workspaceId
      })
  })
)(WorkspaceItem);
