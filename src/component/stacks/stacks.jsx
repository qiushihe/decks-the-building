import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Stack from "/src/component/stack";

const uncappedMap = map.convert({ cap: false });

const Base = styled.div``;

const ContainerBase = styled.div`
  display: flex !important;
  flex-direction: row;
  flex: 1 1 auto;
  min-height: 168px !important;
  height: 100%;
  width: 100%;
`;

const StyledDraggable = styled(Draggable)`
  display: flex !important;
  height: auto !important;
  padding: 0 6px;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;

class Stacks extends React.PureComponent {
  render() {
    const { laneId, stackIds, moveStack } = this.props;

    return (
      <Base>
        <Container
          groupName="stack"
          orientation="horizontal"
          getChildPayload={index => ({ laneId, stackIndex: index })}
          shouldAcceptDrop={({ groupName }) => groupName === "stack"}
          onDrop={({ addedIndex, payload }) => {
            if (addedIndex !== null) {
              moveStack({
                fromId: payload.laneId,
                toId: laneId,
                fromStackIndex: payload.stackIndex,
                toStackIndex: addedIndex
              });
            }
          }}
          render={ref => (
            <ContainerBase ref={ref}>
              {uncappedMap((stackId, index) => (
                <StyledDraggable key={stackId}>
                  <Stack laneId={laneId} stackId={stackId} stackIndex={index} />
                </StyledDraggable>
              ))(stackIds)}
            </ContainerBase>
          )}
        />
      </Base>
    );
  }
}

Stacks.propTypes = {
  laneId: PropTypes.string,
  stackIds: PropTypes.array,
  moveStack: PropTypes.func
};

Stacks.defaultProps = {
  laneId: "",
  stackIds: [],
  moveStack: () => {}
};

export default Stacks;
