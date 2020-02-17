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
  CARD_LOAD_TIMEOUT,
  CARD_DEFAULT_SCALE,
  CARD_WIDTH,
  CARD_HEIGHT,
  CARD_COLLAPSED_HEIGHT_SHRINK_FACTOR,
  CARD_COLLAPSED_IMAGE_SHIFT_FACTOR,
  CARD_MENU_ICON_SIZE_FACTOR,
  CARD_COLLAPSED_MENU_VERTICAL_OFFSET_FACTOR,
  CARD_COLLAPSED_MENU_HORIZONTAL_OFFSET_FACTOR,
  CARD_EXPANDED_MENU_VERTICAL_OFFSET_FACTOR,
  CARD_EXPANDED_MENU_HORIZONTAL_OFFSET_FACTOR
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

const Base = styled.div`
  overflow: visible !important;
`;

const CardImage = styled(props => {
  const { imageUrl, title } = props;
  const componentProps = omit(["imageUrl", "title", "scale", "collapsed"])(
    props
  );
  return <img {...componentProps} src={imageUrl} alt={title} />;
})`
  display: block;
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: ${cond([
    [
      get("collapsed"),
      flow([
        get("scale"),
        multiply(CARD_HEIGHT),
        multiply(CARD_COLLAPSED_IMAGE_SHIFT_FACTOR),
        multiply(-1)
      ])
    ],
    [stubTrue, constant(0)]
  ])}px;
  pointer-events: none;
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
  constructor(...args) {
    super(...args);

    this.loadTimeout = null;
    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  notifyLoaded() {
    const { onLoad } = this.props;

    if (this.loadTimeout !== null) {
      clearTimeout(this.loadTimeout);
      this.loadTimeout = null;
    }

    onLoad();
  }

  handleImageLoad() {
    this.notifyLoaded();
  }

  componentDidMount() {
    this.loadTimeout = setTimeout(() => {
      this.notifyLoaded();
    }, CARD_LOAD_TIMEOUT);
  }

  render() {
    const {
      className,
      stackId,
      cardId,
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
            onLoad={this.handleImageLoad}
          />
          {count > 1 && (
            <CardCount>
              <span>{count}</span>
            </CardCount>
          )}
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
  onLoad: PropTypes.func,
  stackId: PropTypes.string,
  cardId: PropTypes.string,
  cardIndex: PropTypes.number,
  scale: PropTypes.number,
  collapsed: PropTypes.bool,
  count: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string
};

Card.defaultProps = {
  className: "",
  onLoad: () => {},
  stackId: "",
  cardId: "",
  cardIndex: 0,
  scale: CARD_DEFAULT_SCALE,
  collapsed: false,
  count: 1,
  name: "Card",
  imageUrl: ""
};

export default Card;
