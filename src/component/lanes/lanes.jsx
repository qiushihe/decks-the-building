import React from "react";
import PropTypes from "prop-types";
import { Container } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Lane from "/src/component/lane";

class Lanes extends React.PureComponent {
  render() {
    const { laneIds, move } = this.props;

    return (
      <Container
        groupName="lane"
        getChildPayload={index => ({ laneIndex: index })}
        shouldAcceptDrop={({ groupName }) => groupName === "lane"}
        onDrop={({ addedIndex, payload }) => {
          if (addedIndex !== null) {
            move({
              fromIndex: payload.laneIndex,
              toIndex: addedIndex
            });
          }
        }}
      >
        {map(laneId => <Lane key={laneId} laneId={laneId} />)(laneIds)}
      </Container>
    );
  }
}

Lanes.propTypes = {
  laneIds: PropTypes.array,
  move: PropTypes.func
};

Lanes.defaultProps = {
  laneIds: [],
  move: () => {}
};

export default Lanes;
