import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import first from "lodash/fp/first";
import without from "lodash/fp/without";

import { RENAME_OBJECT } from "/src/enum/modal.enum";
import { WORKSPACE } from "/src/enum/nameable.enum";
import { show } from "/src/action/modal.action";
import { save, create, remove, activate } from "/src/action/workspace.action";

import {
  allWorkspaceIds,
  workspaceLabel
} from "/src/selector/workspace.selector";

import WorkspaceActions from "./workspace-actions";

export default connect(
  createStructuredSelector({
    allWorkspaceIds,
    workspaceLabel
  }),
  dispatch => ({
    show: ({ name, props }) => dispatch(show({ name, props })),
    save: ({ id }) => dispatch(save({ id })),
    create: ({ id, label }) => dispatch(create({ id, label })),
    remove: ({ id }) => dispatch(remove({ id })),
    activate: ({ id }) => dispatch(activate({ id }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    renameWorkspace: () =>
      dispatchProps.show({
        name: RENAME_OBJECT,
        props: {
          nameable: WORKSPACE,
          name: stateProps.workspaceLabel,
          workspaceId: ownProps.workspaceId
        }
      }),
    saveWorkspace: () =>
      dispatchProps.save({
        id: ownProps.workspaceId
      }),
    createWorkspace: () =>
      dispatchProps
        .create({
          id: uuidV4(),
          label: "Untitled"
        })
        .then(({ payload: { id: workspaceId } }) =>
          dispatchProps.activate({ id: workspaceId })
        ),
    removeWorkspace: () =>
      dispatchProps
        .remove({
          id: ownProps.workspaceId
        })
        .then(() =>
          flow([
            without([ownProps.workspaceId]),
            first,
            workspaceId => dispatchProps.activate({ id: workspaceId })
          ])(stateProps.allWorkspaceIds)
        )
  })
)(WorkspaceActions);
