import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Base = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
`;

export class Fill extends React.PureComponent {
  render() {
    const { children, ...rest } = this.props;
    return <Base {...rest}>{React.Children.toArray(children)}</Base>;
  }
}

Fill.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

Fill.defaultProps = {
  children: []
};

Fill.displayName = "Arrange.Fill";

export default Fill;
