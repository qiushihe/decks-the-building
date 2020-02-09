import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Lane from "/src/component/lane";

const Base = styled.div`
  overflow: auto;
`;

class Lanes extends React.PureComponent {
  render() {
    const { laneIds, moveLane } = this.props;

    return (
      <Base data-scrollable="true">
        <Container
          groupName="lane"
          getChildPayload={index => ({ laneIndex: index })}
          shouldAcceptDrop={({ groupName }) => groupName === "lane"}
          onDrop={({ addedIndex, payload }) => {
            if (addedIndex !== null) {
              moveLane({
                fromIndex: payload.laneIndex,
                toIndex: addedIndex
              });
            }
          }}
        >
          {map(laneId => <Lane key={laneId} laneId={laneId} />)(laneIds)}
        </Container>
      </Base>
    );
  }
}

Lanes.propTypes = {
  laneIds: PropTypes.array,
  moveLane: PropTypes.func
};

Lanes.defaultProps = {
  laneIds: [],
  moveLane: () => {}
};

export default Lanes;
