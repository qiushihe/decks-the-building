import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Arrange from "/src/component/arrange";

import {
  RenameIcon,
  DeleteIcon,
  SaveIcon,
  ImportExportIcon,
  CreateIcon
} from "/src/component/icon";

const IconStyle = css`
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const RenameWorkspaceIcon = styled(RenameIcon)`
  ${IconStyle}
`;

const DeleteWorkspaceIcon = styled(DeleteIcon)`
  ${IconStyle}
`;

const SaveWorkspaceIcon = styled(SaveIcon)`
  ${IconStyle}
`;

const SyncWithCloudIcon = styled(ImportExportIcon)`
  ${IconStyle}
`;

const CreateWorkspaceIcon = styled(CreateIcon)`
  ${IconStyle}
`;

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
      <div className={className}>
        <Arrange>
          <Arrange.Fit>
            <RenameWorkspaceIcon onClick={renameWorkspace} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <SaveWorkspaceIcon onClick={saveWorkspace} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <SyncWithCloudIcon onClick={syncWithCloud} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <DeleteWorkspaceIcon onClick={removeWorkspace} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <CreateWorkspaceIcon onClick={createWorkspace} />
          </Arrange.Fit>
        </Arrange>
      </div>
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
