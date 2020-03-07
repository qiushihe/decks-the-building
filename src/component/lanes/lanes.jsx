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

const ContainerBase = styled.div`
  display: flex !important;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
  min-height: 100%;
`;

const StyledDraggable = styled(Draggable)`
  padding: 3px 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
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
          render={ref => (
            <ContainerBase ref={ref}>
              {uncappedMap((laneId, index) => (
                <StyledDraggable key={laneId}>
                  <Lane
                    workspaceId={workspaceId}
                    laneId={laneId}
                    laneIndex={index}
                  />
                </StyledDraggable>
              ))(laneIds)}
            </ContainerBase>
          )}
        />
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
