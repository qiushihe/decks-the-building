import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Lane from "/src/component/lane";

class Lanes extends React.PureComponent {
  render() {
    const { laneIds } = this.props;

    return (
      <Container
        groupName="lane"
        shouldAcceptDrop={({ groupName }) => groupName === "lane"}
      >
        {map(laneId => <Lane key={laneId} laneId={laneId} />)(laneIds)}
      </Container>
    );
  }
}

Lanes.propTypes = {
  laneIds: PropTypes.array
};

Lanes.defaultProps = {
  laneIds: []
};

export default Lanes;
