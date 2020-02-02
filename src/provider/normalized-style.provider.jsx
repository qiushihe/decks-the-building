import React from "react";
import PropTypes from "prop-types";

import { Normalize as NormalizeStyles } from "styled-normalize";

export class NormalizedStyleProvider extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <NormalizeStyles />
        {children}
      </React.Fragment>
    );
  }
}

NormalizedStyleProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

NormalizedStyleProvider.defaultProps = {
  children: null
};

export default NormalizedStyleProvider;
