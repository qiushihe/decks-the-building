import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "react-smooth-dnd";
import map from "lodash/fp/map";
import omit from "lodash/fp/omit";

import Stack from "/src/component/stack";

const Base = styled(props => {
  const componentProps = omit([])(props);
  return (
    <Container
      {...componentProps}
      orientation="horizontal"
      groupName="stack"
      shouldAcceptDrop={({ groupName }) => groupName === "stack"}
    />
  );
})`
  display: flex;
  flex-direction: row;
`;

const StyledStack = styled(Stack)``;

class Stacks extends React.PureComponent {
  render() {
    const { stackIds } = this.props;

    return (
      <Base>
        {map(stackId => <StyledStack key={stackId} stackId={stackId} />)(
          stackIds
        )}
      </Base>
    );
  }
}

Stacks.propTypes = {
  stackIds: PropTypes.array
};

Stacks.defaultProps = {
  stackIds: []
};

export default Stacks;
