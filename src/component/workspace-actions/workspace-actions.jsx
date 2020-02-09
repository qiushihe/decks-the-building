import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Edit, Trash2, Save } from "react-feather";

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

const RenameLandIcon = styled(Edit)`
  ${IconStyle}
`;

const DeleteLandIcon = styled(Trash2)`
  ${IconStyle}
`;

const SaveIcon = styled(Save)`
  ${IconStyle}
`;

class WorkspaceActions extends React.PureComponent {
  render() {
    const { className, showRenameModal, save } = this.props;
    return (
      <div className={className}>
        <Arrange>
          <Arrange.Fit>
            <RenameLandIcon onClick={showRenameModal} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <DeleteLandIcon />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <SaveIcon onClick={save} />
          </Arrange.Fit>
        </Arrange>
      </div>
    );
  }
}

WorkspaceActions.propTypes = {
  className: PropTypes.string,
  showRenameModal: PropTypes.func,
  save: PropTypes.func
};

WorkspaceActions.defaultProps = {
  className: "",
  showRenameModal: () => {},
  save: () => {}
};

export default WorkspaceActions;
