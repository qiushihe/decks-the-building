import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import {
  RenameIcon,
  DeleteIcon,
  SaveIcon,
  ImportExportIcon,
  CreateIcon
} from "/src/component/icon";

const Base = styled.div``;

const IconStyle = css`
  margin: 2px;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const makeWorkspaceActionIcon = IconComponent => styled(IconComponent).attrs({
  size: 20
})`
  ${IconStyle}
`;

const RenameWorkspaceIcon = makeWorkspaceActionIcon(RenameIcon);
const DeleteWorkspaceIcon = makeWorkspaceActionIcon(DeleteIcon);
const SaveWorkspaceIcon = makeWorkspaceActionIcon(SaveIcon);
const SyncWithCloudIcon = makeWorkspaceActionIcon(ImportExportIcon);
const CreateWorkspaceIcon = makeWorkspaceActionIcon(CreateIcon);

class WorkspaceActions extends React.PureComponent {
  render() {
    const {
      className,
      renameWorkspace,
      saveWorkspace,
      createWorkspace,
      removeWorkspace,
      syncWithCloud
    } = this.props;

    return (
      <Base className={className}>
        <Tooltip title="Rename Workspace">
          <IconButton size="small" onClick={renameWorkspace}>
            <RenameWorkspaceIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Save Workspace">
          <IconButton size="small" onClick={saveWorkspace}>
            <SaveWorkspaceIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Sync Workspace">
          <IconButton size="small" onClick={syncWithCloud}>
            <SyncWithCloudIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Workspace">
          <IconButton size="small" onClick={removeWorkspace}>
            <DeleteWorkspaceIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Create Workspace">
          <IconButton size="small" onClick={createWorkspace}>
            <CreateWorkspaceIcon />
          </IconButton>
        </Tooltip>
      </Base>
    );
  }
}

WorkspaceActions.propTypes = {
  className: PropTypes.string,
  renameWorkspace: PropTypes.func,
  saveWorkspace: PropTypes.func,
  createWorkspace: PropTypes.func,
  removeWorkspace: PropTypes.func,
  syncWithCloud: PropTypes.func
};

WorkspaceActions.defaultProps = {
  className: "",
  renameWorkspace: () => {},
  saveWorkspace: () => {},
  createWorkspace: () => {},
  removeWorkspace: () => {},
  syncWithCloud: () => {}
};

export default WorkspaceActions;
