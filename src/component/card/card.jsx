import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import omit from "lodash/fp/omit";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";
import cond from "lodash/fp/cond";
import stubTrue from "lodash/fp/stubTrue";

import {
  CARD_DEFAULT_SCALE,
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_COLLAPSED_HEIGHT_SHRINK_FACTOR,
  CARD_MENU_ICON_SIZE_FACTOR,
  CARD_COLLAPSED_MENU_VERTICAL_OFFSET_FACTOR,
  CARD_COLLAPSED_MENU_HORIZONTAL_OFFSET_FACTOR,
  CARD_EXPANDED_MENU_VERTICAL_OFFSET_FACTOR,
  CARD_EXPANDED_MENU_HORIZONTAL_OFFSET_FACTOR
} from "/src/config";

import CardActions from "/src/component/card-actions";

import CardCount from "./card-count.connect";
import FullImage from "./full-image.connect";
import CompactImage from "./compact-image.connect";

const Base = styled.div`
  overflow: visible !important;
`;

const StyledCardActions = styled(props => {
  const componentProps = omit(["scale", "collapsed"])(props);
  return <CardActions {...componentProps} />;
})`
  position: absolute;
  top: ${cond([
    [
      get("collapsed"),
      flow([
        get("scale"),
        multiply(CARD_HEIGHT),
        multiply(CARD_COLLAPSED_MENU_VERTICAL_OFFSET_FACTOR)
      ])
    ],
    [
      stubTrue,
      flow([
        get("scale"),
        multiply(CARD_HEIGHT),
        multiply(CARD_EXPANDED_MENU_VERTICAL_OFFSET_FACTOR)
      ])
    ]
  ])}px;

  right: ${cond([
    [
      get("collapsed"),
      flow([
        get("scale"),
        multiply(CARD_HEIGHT),
        multiply(CARD_COLLAPSED_MENU_HORIZONTAL_OFFSET_FACTOR)
      ])
    ],
    [
      stubTrue,
      flow([
        get("scale"),
        multiply(CARD_HEIGHT),
        multiply(CARD_EXPANDED_MENU_HORIZONTAL_OFFSET_FACTOR)
      ])
    ]
  ])}px;
`;

const Content = styled(props => {
  const componentProps = omit(["scale", "collapsed"])(props);
  return <div {...componentProps} />;
})`
  position: relative;
  border-radius: 10px;
  width: ${flow([get("scale"), multiply(CARD_WIDTH)])}px;
  height: ${cond([
    [
      get("collapsed"),
      flow([
        get("scale"),
        multiply(CARD_HEIGHT),
        multiply(CARD_COLLAPSED_HEIGHT_SHRINK_FACTOR)
      ])
    ],
    [stubTrue, flow([get("scale"), multiply(CARD_HEIGHT)])]
  ])}px;
  overflow: hidden !important;
  box-shadow: 0 3px 6px -3px rgba(0, 0, 0, 0.69);

  ${StyledCardActions} {
    opacity: 0;
  }

  &:hover ${StyledCardActions} {
    opacity: 1;
  }
`;

class Card extends React.PureComponent {
  render() {
    const {
      className,
      stackId,
      cardId,
      cardIndex,
      scale,
      collapsed
    } = this.props;

    return (
      <Base className={className}>
        <Content scale={scale} collapsed={collapsed}>
          {collapsed ? (
            <CompactImage cardId={cardId} />
          ) : (
            <FullImage
              stackId={stackId}
              cardId={cardId}
              cardIndex={cardIndex}
            />
          )}
          <CardCount stackId={stackId} cardIndex={cardIndex} />
          <StyledCardActions
            stackId={stackId}
            cardId={cardId}
            cardIndex={cardIndex}
            scale={scale}
            collapsed={collapsed}
            size={scale * CARD_HEIGHT * CARD_MENU_ICON_SIZE_FACTOR}
          />
        </Content>
      </Base>
    );
  }
}

Card.propTypes = {
  className: PropTypes.string,
  stackId: PropTypes.string,
  cardId: PropTypes.string,
  cardIndex: PropTypes.number,
  scale: PropTypes.number,
  collapsed: PropTypes.bool
};

Card.defaultProps = {
  className: "",
  stackId: "",
  cardId: "",
  cardIndex: 0,
  scale: CARD_DEFAULT_SCALE,
  collapsed: false
};

export default Card;
