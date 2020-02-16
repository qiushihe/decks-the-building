import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import WorkspaceSelector from "/src/component/workspace-selector";

import ActionsHeader, {
  ActionsHeaderLabel
} from "/src/component/actions-header";

import {
  RenameIcon,
  DeleteIcon,
  SaveIcon,
  ImportExportIcon,
  CreateIcon,
  WorkspaceIcon
} from "/src/component/icon";

const Base = styled.div`
  padding: 6px 6px 6px 22px;
  margin-bottom: 3px;
  background-color: #ebeef2;
  box-shadow: 0 3px 3px -3px #00000069;
`;

const StyledWorkspaceIcon = styled(WorkspaceIcon)`
  color: #0000008a;
  margin-right: 3px;
`;

const IconStyle = css`
  margin: 2px;
  cursor: pointer;
  opacity: 0.75;

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

class WorkspaceHeader extends React.PureComponent {
  render() {
    const {
      className,
      workspaceId,
      renameWorkspace,
      saveWorkspace,
      createWorkspace,
      removeWorkspace,
      syncWithCloud
    } = this.props;

    return (
      <Base className={className}>
        <ActionsHeader
          renderLabel={() => (
            <ActionsHeaderLabel
              icon={StyledWorkspaceIcon}
              label={() => <WorkspaceSelector workspaceId={workspaceId} />}
            />
          )}
          actions={[
            {
              title: "Rename Workspace",
              icon: RenameWorkspaceIcon,
              action: renameWorkspace
            },
            {
              title: "Save Workspace",
              icon: SaveWorkspaceIcon,
              action: saveWorkspace
            },
            {
              title: "Sync Workspace",
              icon: SyncWithCloudIcon,
              action: syncWithCloud
            },
            {
              title: "Delete Workspace",
              icon: DeleteWorkspaceIcon,
              action: removeWorkspace
            },
            {
              title: "Create Workspace",
              icon: CreateWorkspaceIcon,
              action: createWorkspace
            }
          ]}
          disableLabelAutoHide={true}
        />
      </Base>
    );
  }
}

WorkspaceHeader.propTypes = {
  className: PropTypes.string,
  workspaceId: PropTypes.string,
  renameWorkspace: PropTypes.func,
  saveWorkspace: PropTypes.func,
  createWorkspace: PropTypes.func,
  removeWorkspace: PropTypes.func,
  syncWithCloud: PropTypes.func
};

WorkspaceHeader.defaultProps = {
  className: "",
  workspaceId: "",
  renameWorkspace: () => {},
  saveWorkspace: () => {},
  createWorkspace: () => {},
  removeWorkspace: () => {},
  syncWithCloud: () => {}
};

export default WorkspaceHeader;
