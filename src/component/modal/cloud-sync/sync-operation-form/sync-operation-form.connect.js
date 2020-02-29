import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import isNil from "lodash/fp/isNil";
import isFunction from "lodash/fp/isFunction";

import {
  importWorkspace,
  exportWorkspace,
  clearLogin
} from "/src/action/s3.action";

import { selectedWorkspaceId } from "/src/selector/s3.selector";
import { activeWorkspaceId } from "/src/selector/workspace.selector";

import SyncOperationForm from "./sync-operation-form";

export default connect(
  createStructuredSelector({
    remoteId: selectedWorkspaceId,
    localId: activeWorkspaceId
  }),
  dispatch => ({
    importWorkspace: ({ remoteId, localId }) =>
      dispatch(importWorkspace({ remoteId, localId })),
    exportWorkspace: ({ localId, remoteId }) =>
      dispatch(exportWorkspace({ localId, remoteId })),
    clearLogin: () => dispatch(clearLogin())
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    hasLocal: !isNil(stateProps.localId),
    hasRemote: !isNil(stateProps.remoteId),
    onSignOut: () => {
      dispatchProps.clearLogin();
      if (isFunction(ownProps.onSignOut)) {
        ownProps.onSignOut();
      }
    },
    replaceCurrentWithSelected: () =>
      dispatchProps.importWorkspace({
        remoteId: stateProps.remoteId,
        localId: stateProps.localId
      }),
    openSelectedAsNew: () =>
      dispatchProps.importWorkspace({
        remoteId: stateProps.remoteId,
        localId: null
      }),
    saveCurrentToSelected: () =>
      dispatchProps.exportWorkspace({
        localId: stateProps.localId,
        remoteId: stateProps.remoteId
      }),
    saveCurrentAsNew: () =>
      dispatchProps.exportWorkspace({
        localId: stateProps.localId,
        remoteId: null
      })
  })
)(SyncOperationForm);
