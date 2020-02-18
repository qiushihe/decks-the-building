import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import omit from "lodash/fp/omit";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import lt from "lodash/fp/lt";
import stubTrue from "lodash/fp/stubTrue";
import constant from "lodash/fp/constant";

const Base = styled(props => {
  const componentProps = omit(["count"])(props);
  return <div {...componentProps} />;
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 35px;
  height: 35px;
  border-radius: 10px 0 0 0;
  overflow: hidden;
  opacity: ${flow([
    get("count"),
    cond([
      [lt(1), constant(1)],
      [stubTrue, constant(0)]
    ])
  ])};

  span {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    color: #ffffff;
    font-weight: bold;
    font-size: 11px;
    text-align: center;
    z-index: 2;
    text-shadow: 1px 1px 1px #0000004d;
  }

  &::before {
    content: "";
    background-color: #424242;
    width: 200%;
    height: 200%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(45deg) translate(-85%, 0px);
    box-shadow: 1px 0 1px 0 #00000033;
    z-index: 1;
  }
`;

class CardCount extends React.PureComponent {
  render() {
    const { className, count } = this.props;

    return (
      <Base className={className} count={count}>
        <span>{count > 99 ? "99+" : count}</span>
      </Base>
    );
  }
}

CardCount.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number
};

CardCount.defaultProps = {
  className: "",
  count: 0
};

export default CardCount;
