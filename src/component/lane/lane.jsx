import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Draggable } from "react-smooth-dnd";
import omit from "lodash/fp/omit";
import { Trello } from "react-feather";

import Arrange from "/src/component/arrange";
import LaneActions from "/src/component/lane-actions";
import Stacks from "/src/component/stacks";

const Content = styled.div`
  margin: 6px 0;
`;

const Base = styled(props => {
  const componentProps = omit([])(props);
  return <Draggable {...componentProps} />;
})`
  &:first-child ${Content} {
    margin-top: 0;
  }

  &:last-child ${Content} {
    margin-bottom: 0;
  }
`;

const IconStyle = css`
  width: 16px;
  height: 16px;
`;

const LaneIcon = styled(Trello)`
  ${IconStyle}
`;

class Lane extends React.PureComponent {
  render() {
    const { laneId, label } = this.props;
    return (
      <Base>
        <Content>
          <Arrange>
            <Arrange.Fit>
              <LaneIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fill>{label}</Arrange.Fill>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <LaneActions laneId={laneId} />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;&nbsp;&nbsp;</Arrange.Fit>
          </Arrange>
          <Stacks laneId={laneId} />
        </Content>
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
