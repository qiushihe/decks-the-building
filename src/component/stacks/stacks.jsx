import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Stack from "/src/component/stack";

const uncappedMap = map.convert({ cap: false });

const Base = memo(styled.div`
  display: inline-flex;
  min-width: 100%;
  padding-bottom: 12px;
`);

const StackContainer = memo(styled.div`
  margin: 0 2px;
  height: 100%;
`);

class Stacks extends React.PureComponent {
  render() {
    const { className, laneId, stackIds, moveStack } = this.props;

    return (
      <Base className={className}>
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
        >
          {uncappedMap((stackId, index) => (
            <Draggable key={index}>
              <StackContainer>
                <Stack laneId={laneId} stackId={stackId} stackIndex={index} />
              </StackContainer>
            </Draggable>
          ))(stackIds)}
        </Container>
      </Base>
    );
  }
}

Stacks.propTypes = {
  className: PropTypes.string,
  laneId: PropTypes.string,
  stackIds: PropTypes.array,
  moveStack: PropTypes.func
};

Stacks.defaultProps = {
  className: "",
  laneId: "",
  stackIds: [],
  moveStack: () => {}
};

export default Stacks;
