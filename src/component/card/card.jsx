import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Draggable } from "react-smooth-dnd";
import omit from "lodash/fp/omit";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";

const Base = styled(props => {
  const componentProps = omit(["scale"])(props);
  return <Draggable {...componentProps} />;
})`
  border-radius: 10px;
  width: ${flow([get("scale"), multiply(63)])}px;
  height: ${flow([get("scale"), multiply(88)])}px;
  overflow: hidden !important;
  box-shadow: 0px 0px 3px 0px #000000;
`;

const CardBase = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CardImage = styled(props => {
  const componentProps = omit(["imageUrl"])(props);
  return <div {...componentProps} />;
})`
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(${get("imageUrl")});
  background-size: cover;
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

  &:before {
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
    const { scale, count, name, imageUrl } = this.props;

    return (
      <Base scale={scale}>
        <CardBase>
          {count > 1 && (
            <CardCount>
              <span>{count}</span>
            </CardCount>
          )}
          <CardImage title={name} imageUrl={imageUrl} />
        </CardBase>
      </Base>
    );
  }
}

Card.propTypes = {
  scale: PropTypes.number,
  count: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string
};

Card.defaultProps = {
  scale: 3.5,
  count: 1,
  name: "Card",
  imageUrl: ""
};

export default Card;
