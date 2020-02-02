import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Draggable } from "react-smooth-dnd";

const Base = styled(Draggable)`
  width: 63px;
  height: 88px;
`;

class Card extends React.PureComponent {
  render() {
    const { name } = this.props;
    return (
      <Base>
        <div>Card: {name}</div>
      </Base>
    );
  }
}

Card.propTypes = {
  name: PropTypes.string
};

Card.defaultProps = {
  name: "Card"
};

export default Card;
