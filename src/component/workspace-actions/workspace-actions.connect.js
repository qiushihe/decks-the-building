import { connect } from "react-redux";

import { save } from "/src/action/workspace.action";

import WorkspaceActions from "./workspace-actions";

export default connect(
  null,
  dispatch => ({
    save: ({ id }) => dispatch(save({ id }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    save: () =>
      dispatchProps.save({
        id: ownProps.workspaceId
      })
  })
)(WorkspaceActions);
