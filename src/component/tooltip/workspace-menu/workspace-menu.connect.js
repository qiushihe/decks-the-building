import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuidV4 from "uuid/v4";
import isFunction from "lodash/fp/isFunction";

import { RENAME_OBJECT, REMOVE_OBJECT, CLOUD_SYNC } from "/src/enum/modal.enum";
import { WORKSPACE } from "/src/enum/nameable.enum";
import { show } from "/src/action/modal.action";
import { save, create, activate } from "/src/action/workspace.action";
import { workspaceLabel } from "/src/selector/workspace.selector";

import WorkspaceMenu from "./workspace-menu";

export default connect(
  createStructuredSelector({
    workspaceLabel
  }),
  dispatch => ({
    show: ({ name, props }) => dispatch(show({ name, props })),
    save: ({ id }) => dispatch(save({ id })),
    create: ({ id, label }) => dispatch(create({ id, label })),
    activate: ({ id }) => dispatch(activate({ id }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    renameWorkspace: () => {
      if (isFunction(ownProps.hideTooltip)) {
        ownProps.hideTooltip();
      }

      dispatchProps.show({
        name: RENAME_OBJECT,
        props: {
          nameable: WORKSPACE,
          name: stateProps.workspaceLabel,
          workspaceId: ownProps.workspaceId
        }
      });
    },
    saveWorkspace: () => {
      if (isFunction(ownProps.hideTooltip)) {
        ownProps.hideTooltip();
      }

      dispatchProps.save({
        id: ownProps.workspaceId
      });
    },
    createWorkspace: () => {
      if (isFunction(ownProps.hideTooltip)) {
        ownProps.hideTooltip();
      }

      dispatchProps
        .create({
          id: uuidV4(),
          label: "Untitled"
        })
        .then(({ payload: { id: workspaceId } }) =>
          dispatchProps.activate({ id: workspaceId })
        );
    },
    removeWorkspace: () => {
      if (isFunction(ownProps.hideTooltip)) {
        ownProps.hideTooltip();
      }

      dispatchProps.show({
        name: REMOVE_OBJECT,
        props: {
          removable: WORKSPACE,
          name: stateProps.workspaceLabel,
          workspaceId: ownProps.workspaceId
        }
      });
    },
    syncWithCloud: () => {
      if (isFunction(ownProps.hideTooltip)) {
        ownProps.hideTooltip();
      }

      dispatchProps.show({
        name: CLOUD_SYNC,
        props: {
          workspaceId: ownProps.workspaceId
        }
      });
    }
  })
)(WorkspaceMenu);
