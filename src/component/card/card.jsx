import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import omit from "lodash/fp/omit";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";
import cond from "lodash/fp/cond";
import stubTrue from "lodash/fp/stubTrue";
import constant from "lodash/fp/constant";

import CardActions from "/src/component/card-actions";

import {
  CARD_DEFAULT_SCALE,
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_HEIGHT_COLLAPSED_SHRINK_FACTOR,
  CARD_IMAGE_COLLAPSED_SHIFT_FACTOR,
  CARD_MENU_EDGE_OFFSET_FACTOR,
  CARD_MENU_EXPANDED_TOP_OFFSET_FACTOR,
  CARD_MENU_ICON_SIZE_FACTOR
} from "/src/config";

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
        multiply(CARD_MENU_EDGE_OFFSET_FACTOR)
      ])
    ],
    [
      stubTrue,
      flow([
        get("scale"),
        multiply(CARD_HEIGHT),
        multiply(CARD_MENU_EXPANDED_TOP_OFFSET_FACTOR)
      ])
    ]
  ])}px;
  right: ${flow([
    get("scale"),
    multiply(CARD_HEIGHT),
    multiply(CARD_MENU_EDGE_OFFSET_FACTOR)
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
        multiply(CARD_HEIGHT_COLLAPSED_SHRINK_FACTOR)
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

const Base = styled.div`
  overflow: visible !important;
  padding: 1px 0;
`;

const CardImage = styled(props => {
  const componentProps = omit(["imageUrl", "scale", "collapsed"])(props);
  return <div {...componentProps} />;
})`
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(${get("imageUrl")});
  background-size: cover;
  background-position-y: ${cond([
    [
      get("collapsed"),
      flow([
        get("scale"),
        multiply(CARD_HEIGHT),
        multiply(CARD_IMAGE_COLLAPSED_SHIFT_FACTOR),
        multiply(-1)
      ])
    ],
    [stubTrue, constant(0)]
  ])}px;
`;

const CardCount = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 35px;
  height: 35px;
  border-radius: 10px 0 0 0;
  overflow: hidden;

  span {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    color: #ffffff;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
    z-index: 2;
  }

  &::before {
    content: "";
    background-color: #808080;
    width: 200%;
    height: 200%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(45deg) translate(-85%, 0px);
    z-index: 1;
  }
`;

class Card extends React.PureComponent {
  render() {
    const {
      className,
      stackId,
      cardIndex,
      scale,
      collapsed,
      count,
      name,
      imageUrl
    } = this.props;

    return (
      <Base className={className}>
        <Content scale={scale} collapsed={collapsed}>
          <CardImage
            title={name}
            imageUrl={imageUrl}
            scale={scale}
            collapsed={collapsed}
          />
          {count > 1 && (
            <CardCount>
              <span>{count}</span>
            </CardCount>
          )}
          <StyledCardActions
            stackId={stackId}
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
  cardIndex: PropTypes.number,
  scale: PropTypes.number,
  collapsed: PropTypes.bool,
  count: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string
};

Card.defaultProps = {
  className: "",
  stackId: "",
  cardIndex: 0,
  scale: CARD_DEFAULT_SCALE,
  collapsed: false,
  count: 1,
  name: "Card",
  imageUrl: ""
};

export default Card;
