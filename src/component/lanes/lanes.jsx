import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Lane from "/src/component/lane";

const uncappedMap = map.convert({ cap: false });

const Base = styled.div`
  overflow: auto;
`;

const StyledLane = styled(Lane)`
  margin: 3px 0;
`;

const StyledDraggable = styled(Draggable)`
  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

class Lanes extends React.PureComponent {
  render() {
    const { workspaceId, laneIds, moveLane } = this.props;

    return (
      <Base>
        <Container
          groupName="lane"
          lockAxis="y"
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
          {uncappedMap((laneId, index) => (
            <StyledDraggable key={laneId}>
              <StyledLane
                workspaceId={workspaceId}
                laneId={laneId}
                laneIndex={index}
              />
            </StyledDraggable>
          ))(laneIds)}
        </Container>
      </Base>
    );
  }
}

Lanes.propTypes = {
  workspaceId: PropTypes.string,
  laneIds: PropTypes.array,
  moveLane: PropTypes.func
};

Lanes.defaultProps = {
  workspaceId: "",
  laneIds: [],
  moveLane: () => {}
};

export default Lanes;
