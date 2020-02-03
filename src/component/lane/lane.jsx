import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Trello } from "react-feather";

import Stacks from "/src/component/stacks";

const Base = styled.div``;

const LaneIcon = styled(Trello)`
  width: 16px;
  height: 16px;
`;

class Lane extends React.PureComponent {
  render() {
    const { laneId, label } = this.props;
    return (
      <Base>
        <div>
          <LaneIcon /> {label}
        </div>
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
