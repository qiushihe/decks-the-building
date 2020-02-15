import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Arrange from "/src/component/arrange";
import { RenameIcon, DeleteIcon, CreateIcon } from "/src/component/icon";

const IconStyle = css`
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const RenameLane = styled(RenameIcon)`
  ${IconStyle}
`;

const DeleteLane = styled(DeleteIcon)`
  ${IconStyle}
`;

const CreateLane = styled(CreateIcon)`
  ${IconStyle}
`;

class LaneActions extends React.PureComponent {
  render() {
    const { className, renameLane, createLane, removeLane } = this.props;
    return (
      <div className={className}>
        <Arrange>
          <Arrange.Fit>
            <RenameLane onClick={renameLane} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <DeleteLane onClick={removeLane} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <CreateLane onClick={createLane} />
          </Arrange.Fit>
        </Arrange>
      </div>
    );
  }
}

LaneActions.propTypes = {
  className: PropTypes.string,
  renameLane: PropTypes.func,
  createLane: PropTypes.func,
  removeLane: PropTypes.func
};

LaneActions.defaultProps = {
  className: "",
  renameLane: () => {},
  createLane: () => {},
  removeLane: () => {}
};

export default LaneActions;
