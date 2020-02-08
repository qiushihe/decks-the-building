import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Edit, Trash2, PlusCircle } from "react-feather";

import Arrange from "/src/component/arrange";

const IconStyle = css`
  width: 16px;
  height: 16px;
`;

const RenameLandIcon = styled(Edit)`
  ${IconStyle}
`;

const DeleteLandIcon = styled(Trash2)`
  ${IconStyle}
`;

const CreateLandIcon = styled(PlusCircle)`
  ${IconStyle}
`;

class LaneActions extends React.PureComponent {
  render() {
    const { className } = this.props;
    return (
      <Arrange className={className}>
        <Arrange.Fit>
          <RenameLandIcon />
        </Arrange.Fit>
        <Arrange.Fit>&nbsp;</Arrange.Fit>
        <Arrange.Fit>
          <DeleteLandIcon />
        </Arrange.Fit>
        <Arrange.Fit>&nbsp;</Arrange.Fit>
        <Arrange.Fit>
          <CreateLandIcon />
        </Arrange.Fit>
      </Arrange>
    );
  }
}

LaneActions.propTypes = {
  className: PropTypes.string
};

LaneActions.defaultProps = {
  className: ""
};

export default LaneActions;
