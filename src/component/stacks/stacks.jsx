import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import map from "lodash/fp/map";

import Stack from "/src/component/stack";

const Base = styled.div`
  display: flex;
  flex-direction: row;
`;

class Stacks extends React.PureComponent {
  render() {
    const { stackIds } = this.props;

    return (
      <Base>
        {map(stackId => <Stack key={stackId} stackId={stackId} />)(stackIds)}
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
