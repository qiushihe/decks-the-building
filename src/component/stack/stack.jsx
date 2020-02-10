import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";
import add from "lodash/fp/add";
import omit from "lodash/fp/omit";

import { Layers } from "react-feather";

import {
  CARD_DEFAULT_SCALE,
  CARD_WIDTH,
  STACK_CONTENT_SPACING,
  STACK_CARDS_SPACING
} from "/src/config";
import Arrange from "/src/component/arrange";
import StackActions from "/src/component/stack-actions";
import Cards from "/src/component/cards";

const StyledStackActions = styled(StackActions)``;

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

  ${StyledStackActions} {
    opacity: 0;
  }

  &:hover ${StyledStackActions} {
    opacity: 1;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: ${STACK_CONTENT_SPACING}px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  padding: 0 6px;
  margin: 6px 0 12px 0;
`;

const IconStyle = css`
  width: 16px;
  height: 16px;
`;

const StackIcon = styled(Layers)`
  ${IconStyle}
`;

class Stack extends React.PureComponent {
  render() {
    const {
      className,
      scale,
      laneId,
      stackId,
      stackIndex,
      label,
      cardsCount
    } = this.props;

    return (
      <Base className={className} scale={scale}>
        <Content>
          <Header>
            <Arrange>
              <Arrange.Fit>
                <StackIcon />
              </Arrange.Fit>
              <Arrange.Fit>&nbsp;</Arrange.Fit>
              <Arrange.Fill>
                {label}
                {cardsCount > 0 && ` (${cardsCount})`}
              </Arrange.Fill>
              <Arrange.Fit>&nbsp;</Arrange.Fit>
              <Arrange.Fit>
                <StyledStackActions
                  laneId={laneId}
                  stackId={stackId}
                  stackIndex={stackIndex}
                />
              </Arrange.Fit>
            </Arrange>
          </Header>
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
  stackIndex: PropTypes.number,
  label: PropTypes.string,
  cardsCount: PropTypes.number
};

Stack.defaultProps = {
  className: "",
  scale: CARD_DEFAULT_SCALE,
  laneId: "",
  stackId: "",
  stackIndex: 0,
  label: "Stack",
  cardsCount: 0
};

export default Stack;
