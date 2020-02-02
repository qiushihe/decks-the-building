import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Fit from "./fit";
import Fill from "./fill";

const Base = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  ${({ vertical }) =>
    vertical ? "flex-direction: column; height: 100%;" : ""};
  min-width: 0;
`;

export class Arrange extends React.PureComponent {
  render() {
    const { className, vertical, children, ...rest } = this.props;

    return (
      <Base {...rest} className={className} vertical={vertical}>
        {React.Children.toArray(children)}
      </Base>
    );
  }
}

Arrange.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

Arrange.defaultProps = {
  className: "",
  vertical: false,
  children: []
};

Arrange.displayName = "Arrange";

Arrange.Fit = Fit;
Arrange.Fill = Fill;

export default Arrange;
