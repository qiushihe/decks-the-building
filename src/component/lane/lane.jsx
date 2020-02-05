import React from "react";
import PropTypes from "prop-types";
import styled, {css} from 'styled-components';
import { Draggable } from "react-smooth-dnd";
import { Trello, Edit, Trash2, PlusCircle } from "react-feather";
import omit from "lodash/fp/omit";

import Arrange from "/src/component/arrange";
import Stacks from "/src/component/stacks";

const Base = styled(props => {
  const componentProps = omit([])(props);
  return <Draggable {...componentProps} />;
})``;

const IconStyle = css`
  width: 16px;
  height: 16px;
`;

const LaneIcon = styled(Trello)`${IconStyle}`;
const RenameLandIcon = styled(Edit)`${IconStyle}`;
const DeleteLandIcon = styled(Trash2)`${IconStyle}`;
const CreateLandIcon = styled(PlusCircle)`${IconStyle}`;

class Lane extends React.PureComponent {
  render() {
    const { laneId, label } = this.props;
    return (
      <Base>
        <Arrange>
          <Arrange.Fit>
            <LaneIcon />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fill>{label}</Arrange.Fill>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
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
          <Arrange.Fit>&nbsp;&nbsp;&nbsp;</Arrange.Fit>
        </Arrange>
        <Stacks laneId={laneId} />
      </Base>
    );
  }
}

Lane.propTypes = {
  laneId: PropTypes.string,
  label: PropTypes.string
};

Lane.defaultProps = {
  laneId: "",
  label: "Lane"
};

export default Lane;
