import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";
import add from "lodash/fp/add";
import omit from "lodash/fp/omit";

import {
  CARD_DEFAULT_SCALE,
  CARD_WIDTH,
  STACK_CONTENT_SPACING,
  STACK_CARDS_SPACING
} from "/src/config";

import StackHeader from "/src/component/stack-header";
import Cards from "/src/component/cards";

const Base = styled(props => {
  const componentProps = omit(["scale"])(props);
  return <div {...componentProps} />;
})`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: ${flow([
    get("scale"),
    multiply(CARD_WIDTH),
    add(
      flow([add(STACK_CONTENT_SPACING), add(STACK_CARDS_SPACING), multiply(2)])(
        0
      )
    )
  ])}px;
  border-radius: 10px;
  background-color: #f4f6f9;
  box-shadow: 0 1px 2px -1px #00000069;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: ${STACK_CONTENT_SPACING}px;
  height: 100%;
`;

class Stack extends React.PureComponent {
  render() {
    const { className, scale, laneId, stackId, stackIndex } = this.props;

    return (
      <Base className={className} scale={scale}>
        <Content>
          <StackHeader
            laneId={laneId}
            stackId={stackId}
            stackIndex={stackIndex}
          />
          <Cards stackId={stackId} />
        </Content>
      </Base>
    );
  }
}

Stack.propTypes = {
  className: PropTypes.string,
  scale: PropTypes.number,
  laneId: PropTypes.string,
  stackId: PropTypes.string,
  stackIndex: PropTypes.number
};

Stack.defaultProps = {
  className: "",
  scale: CARD_DEFAULT_SCALE,
  laneId: "",
  stackId: "",
  stackIndex: 0
};

export default Stack;
