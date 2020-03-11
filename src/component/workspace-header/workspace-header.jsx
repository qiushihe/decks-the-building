import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { SAVING, SAVED_LOCALLY } from "/src/enum/persistence-status.enum";
import { WORKSPACE_MENU } from "/src/enum/tooltip.enum";
import WorkspaceSelector from "/src/component/workspace-selector";
import ActionsHeader from "/src/component/actions-header";
import { WorkspaceIcon } from "/src/component/icon";

const Base = styled.div`
  padding: 12px 6px 12px 22px;
  margin-bottom: 3px;
  background-color: #ebeef2;
  box-shadow: 0 3px 3px -3px #00000069;
`;

const StyledWorkspaceIcon = styled(WorkspaceIcon)`
  color: #0000008a;
  margin-right: 3px;
`;

const PersistenceStatus = styled.div`
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
    const { className, workspaceId, persistenceStatus } = this.props;

    return (
      <Base className={className}>
        <ActionsHeader
          icon={StyledWorkspaceIcon}
          label={({ menuTrigger }) => (
            <SelectorContainer>
              <WorkspaceSelector workspaceId={workspaceId} />
              <React.Fragment>&nbsp;&nbsp;</React.Fragment>
              {menuTrigger}
              <React.Fragment>&nbsp;&nbsp;</React.Fragment>
              <PersistenceStatus>
                {persistenceMessage[persistenceStatus]}
              </PersistenceStatus>
            </SelectorContainer>
          )}
          menuName={WORKSPACE_MENU}
          menuProps={{ workspaceId }}
        />
      </Base>
    );
  }
}

WorkspaceHeader.propTypes = {
  className: PropTypes.string,
  workspaceId: PropTypes.string,
  persistenceStatus: PropTypes.string
};

WorkspaceHeader.defaultProps = {
  className: "",
  workspaceId: "",
  persistenceStatus: ""
};

export default WorkspaceHeader;
