import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { SAVING, SAVED_LOCALLY } from "/src/enum/persistence-status.enum";
import WorkspaceSelector from "/src/component/workspace-selector";
import ActionsHeader from "/src/component/actions-header";

import {
  RenameIcon,
  DeleteIcon,
  SaveIcon,
  ImportExportIcon,
  CreateIcon,
  WorkspaceIcon
} from "/src/component/icon";

const Base = styled.div`
  padding: 22px 6px 6px 22px;
  margin-bottom: 3px;
  background-color: #ebeef2;
  box-shadow: 0 3px 3px -3px #00000069;
`;

const StyledWorkspaceIcon = styled(WorkspaceIcon)`
  color: #0000008a;
  margin-right: 3px;
`;

const PersistenceStatus = styled.div`
  margin-left: 12px;
  font-size: 12px;
  color: #696969;
  text-shadow: 0 0 1px #00000026;
`;

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
`;

const persistenceMessage = {
  [SAVING]: "Saving ...",
  [SAVED_LOCALLY]: "Saved Locally."
};

class WorkspaceHeader extends React.PureComponent {
  render() {
    const {
      className,
      workspaceId,
      persistenceStatus,
      renameWorkspace,
      saveWorkspace,
      createWorkspace,
      removeWorkspace,
      syncWithCloud
    } = this.props;

    return (
      <Base className={className}>
        <ActionsHeader
          icon={StyledWorkspaceIcon}
          label={() => (
            <SelectorContainer>
              <WorkspaceSelector workspaceId={workspaceId} />
              <PersistenceStatus>
                {persistenceMessage[persistenceStatus]}
              </PersistenceStatus>
            </SelectorContainer>
          )}
          actions={[
            {
              title: "Edit",
              icon: RenameIcon,
              action: renameWorkspace
            },
            {
              title: "Save",
              icon: SaveIcon,
              action: saveWorkspace
            },
            {
              title: "Sync",
              icon: ImportExportIcon,
              action: syncWithCloud
            },
            {
              title: "Del",
              icon: DeleteIcon,
              action: removeWorkspace
            },
            {
              title: "New",
              icon: CreateIcon,
              action: createWorkspace
            }
          ]}
        />
      </Base>
    );
  }
}

WorkspaceHeader.propTypes = {
  className: PropTypes.string,
  workspaceId: PropTypes.string,
  persistenceStatus: PropTypes.string,
  renameWorkspace: PropTypes.func,
  saveWorkspace: PropTypes.func,
  createWorkspace: PropTypes.func,
  removeWorkspace: PropTypes.func,
  syncWithCloud: PropTypes.func
};

WorkspaceHeader.defaultProps = {
  className: "",
  workspaceId: "",
  persistenceStatus: "",
  renameWorkspace: () => {},
  saveWorkspace: () => {},
  createWorkspace: () => {},
  removeWorkspace: () => {},
  syncWithCloud: () => {}
};

export default WorkspaceHeader;
