import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Stack from "/src/component/stack";

const uncappedMap = map.convert({ cap: false });

const Base = styled(Container)`
  display: flex;
  flex-direction: row;
`;

const StyledStack = styled(Stack)``;

class Stacks extends React.PureComponent {
  render() {
    const { laneId, stackIds, moveStack } = this.props;

    return (
      <Base
        orientation="horizontal"
        groupName="stack"
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
          <StyledStack
            key={stackId}
            laneId={laneId}
            stackId={stackId}
            stackIndex={index}
          />
        ))(stackIds)}
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
