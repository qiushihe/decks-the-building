import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Edit, Trash2, PlusCircle } from "react-feather";

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

const RenameLaneIcon = styled(Edit)`
  ${IconStyle}
`;

const DeleteLaneIcon = styled(Trash2)`
  ${IconStyle}
`;

const CreateLaneIcon = styled(PlusCircle)`
  ${IconStyle}
`;

class LaneActions extends React.PureComponent {
  render() {
    const { className, renameLane, createLane, removeLane } = this.props;
    return (
      <div className={className}>
        <Arrange>
          <Arrange.Fit>
            <RenameLaneIcon onClick={renameLane} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <DeleteLaneIcon onClick={removeLane} />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <CreateLaneIcon onClick={createLane} />
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
