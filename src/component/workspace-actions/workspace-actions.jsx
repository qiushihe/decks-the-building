import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Edit, Trash2, Save, PlusCircle } from "react-feather";

import Arrange from "/src/component/arrange";

const IconStyle = css`
  width: 16px;
  height: 16px;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const RenameWorkspaceIcon = styled(Edit)`
  ${IconStyle}
`;

const DeleteWorkspaceIcon = styled(Trash2)`
  ${IconStyle}
`;

const SaveWorkspaceIcon = styled(Save)`
  ${IconStyle}
`;

const CreateWorkspaceIcon = styled(PlusCircle)`
  ${IconStyle}
`;

class WorkspaceActions extends React.PureComponent {
  render() {
    const {
      className,
      renameWorkspace,
      saveWorkspace,
      createWorkspace,
      removeWorkspace
    } = this.props;
    return (
      <div className={className}>
        <Arrange>
          <Arrange.Fit>
            <RenameWorkspaceIcon onClick={renameWorkspace} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <DeleteWorkspaceIcon onClick={removeWorkspace} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <SaveWorkspaceIcon onClick={saveWorkspace} />
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
  removeWorkspace: PropTypes.func
};

WorkspaceActions.defaultProps = {
  className: "",
  renameWorkspace: () => {},
  saveWorkspace: () => {},
  createWorkspace: () => {},
  removeWorkspace: () => {}
};

export default WorkspaceActions;
