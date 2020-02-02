import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Stacks from "/src/component/stacks";

const Base = styled.div``;

class Lane extends React.PureComponent {
  render() {
    const { laneId, label } = this.props;
    return (
      <Base>
        <h1>Lane: {label}</h1>
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
