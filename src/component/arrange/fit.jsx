import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Base = styled.div`
  display: flex;
  flex: 0 0 auto;
  min-width: 0;
`;

export class Fit extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props;

    return <Base {...rest}>{React.Children.toArray(children)}</Base>;
  }
}

Fit.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

Fit.defaultProps = {
  children: []
};

Fit.displayName = "Arrange.Fit";

export default Fit;
