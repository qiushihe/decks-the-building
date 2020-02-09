import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Draggable } from "react-smooth-dnd";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";
import omit from "lodash/fp/omit";

import { Layers } from "react-feather";

import { CARD_DEFAULT_SCALE, CARD_WIDTH } from "/src/config";
import Arrange from "/src/component/arrange";
import StackActions from "/src/component/stack-actions";
import Cards from "/src/component/cards";

const StyledStackActions = styled(StackActions)``;

const Content = styled(props => {
  const componentProps = omit(["scale"])(props);
  return <div {...componentProps} />;
})`
  min-width: ${flow([get("scale"), multiply(CARD_WIDTH)])}px;
  margin: 0 8px;
`;

const Base = styled(Draggable)`
  &:first-child ${Content} {
    margin-left: 0;
  }

  &:last-child ${Content} {
    margin-right: 0;
  }

  ${StyledStackActions} {
    opacity: 0;
  }

  &:hover ${StyledStackActions} {
    opacity: 1;
  }
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
    const { className, scale, laneId, stackId, stackIndex, label } = this.props;

    return (
      <Base className={className}>
        <Content scale={scale}>
          <Arrange>
            <Arrange.Fit>
              <StackIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fill>{label} </Arrange.Fill>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <StyledStackActions
                laneId={laneId}
                stackId={stackId}
                stackIndex={stackIndex}
              />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;&nbsp;&nbsp;</Arrange.Fit>
          </Arrange>
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
  label: PropTypes.string
};

Stack.defaultProps = {
  className: "",
  scale: CARD_DEFAULT_SCALE,
  laneId: "",
  stackId: "",
  stackIndex: 0,
  label: "Stack"
};

export default Stack;
