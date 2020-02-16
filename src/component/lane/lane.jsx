import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Typography } from "@material-ui/core";

import Arrange from "/src/component/arrange";
import LaneActions from "/src/component/lane-actions";
import Stacks from "/src/component/stacks";
import { LaneIcon } from "/src/component/icon";

const StyledLaneActions = styled(LaneActions)``;

const Base = styled.div`
  overflow: hidden;
  min-width: 0;
  background-color: #ebeef2;
  padding: 12px 6px;
  box-shadow: 0 0 0 1px #00000026;

  ${StyledLaneActions} {
    opacity: 0;
  }

  &:hover ${StyledLaneActions} {
    opacity: 1;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  padding: 0 6px 0 16px;
`;

const Divider = styled.div`
  background: #cccccc;
  width: 100%;
  height: 1px;
  margin: 12px 0;
`;

const StacksContainer = styled.div`
  overflow: auto;
  padding-bottom: 6px;
`;

class Lane extends React.PureComponent {
  render() {
    const {
      className,
      workspaceId,
      laneId,
      laneIndex,
      label,
      cardsCount
    } = this.props;

    return (
      <Base className={className}>
        <Header>
          <Arrange>
            <Arrange.Fit>
              <LaneIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fill>
              <Typography display="inline" noWrap={true}>
                {label}
                {cardsCount > 0 && ` (${cardsCount})`}
              </Typography>
            </Arrange.Fill>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <StyledLaneActions
                workspaceId={workspaceId}
                laneId={laneId}
                laneIndex={laneIndex}
              />
            </Arrange.Fit>
          </Arrange>
        </Header>
        <Divider />
        <StacksContainer>
          <Stacks laneId={laneId} />
        </StacksContainer>
      </Base>
    );
  }
}

Lane.propTypes = {
  className: PropTypes.string,
  workspaceId: PropTypes.string,
  laneId: PropTypes.string,
  laneIndex: PropTypes.number,
  label: PropTypes.string,
  cardsCount: PropTypes.number
};

Lane.defaultProps = {
  className: "",
  workspaceId: "",
  laneId: "",
  laneIndex: 0,
  label: "Lane",
  cardsCount: 0
};

export default Lane;
