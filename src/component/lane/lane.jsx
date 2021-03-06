import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LaneHeader from "/src/component/lane-header";
import Stacks from "/src/component/stacks";

const Base = styled.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 100%;
  background-color: #ebeef2;
  padding: 0 6px;
  box-shadow: 0 0 0 1px #00000026;
`;

const Divider = styled.div`
  background: #cccccc;
  width: 100%;
  height: 1px;
  margin-bottom: 12px;
`;

class Lane extends React.PureComponent {
  render() {
    const { className, workspaceId, laneId, laneIndex } = this.props;

    return (
      <Base className={className}>
        <LaneHeader
          workspaceId={workspaceId}
          laneId={laneId}
          laneIndex={laneIndex}
        />
        <Divider />
        <Stacks laneId={laneId} />
      </Base>
    );
  }
}

Lane.propTypes = {
  className: PropTypes.string,
  workspaceId: PropTypes.string,
  laneId: PropTypes.string,
  laneIndex: PropTypes.number
};

Lane.defaultProps = {
  className: "",
  workspaceId: "",
  laneId: "",
  laneIndex: 0
};

export default Lane;
