import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Lane from "/src/component/lane";

const uncappedMap = map.convert({ cap: false });

const ScrollContainer = styled.div`
  overflow: auto;
`;

const Base = memo(styled.div`
  display: inline-flex;
  flex-direction: column;
  min-width: 100%;
`);

const LaneContainer = memo(styled.div`
  margin: 4px 0;
`);

class Lanes extends React.PureComponent {
  render() {
    const { className, workspaceId, laneIds, moveLane } = this.props;

    return (
      <ScrollContainer>
        <Base className={className}>
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
              <Draggable key={index}>
                <LaneContainer>
                  <Lane
                    workspaceId={workspaceId}
                    laneId={laneId}
                    laneIndex={index}
                  />
                </LaneContainer>
              </Draggable>
            ))(laneIds)}
          </Container>
        </Base>
      </ScrollContainer>
    );
  }
}

Lanes.propTypes = {
  className: PropTypes.string,
  workspaceId: PropTypes.string,
  laneIds: PropTypes.array,
  moveLane: PropTypes.func
};

Lanes.defaultProps = {
  className: "",
  workspaceId: "",
  laneIds: [],
  moveLane: () => {}
};

export default Lanes;
