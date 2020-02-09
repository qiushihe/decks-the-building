import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { RENAME_OBJECT } from "/src/enum/modal.enum";
import { WORKSPACE } from "/src/enum/nameable.enum";
import { show as showModal } from "/src/action/modal.action";
import { save } from "/src/action/workspace.action";
import { workspaceLabel } from "/src/selector/workspace.selector";

import WorkspaceActions from "./workspace-actions";

export default connect(
  createStructuredSelector({
    workspaceLabel
  }),
  dispatch => ({
    showModal: ({ name, props }) => dispatch(showModal({ name, props })),
    save: ({ id }) => dispatch(save({ id }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    showRenameModal: () =>
      dispatchProps.showModal({
        name: RENAME_OBJECT,
        props: {
          nameable: WORKSPACE,
          name: stateProps.workspaceLabel,
          workspaceId: ownProps.workspaceId
        }
      }),
    save: () =>
      dispatchProps.save({
        id: ownProps.workspaceId
      })
  })
)(WorkspaceActions);
