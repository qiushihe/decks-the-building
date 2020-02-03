import React from "react";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";

import { Normalize as NormalizeStyles } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: Arial, sans-serif;
  }
`;

export class NormalizedStyleProvider extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <NormalizeStyles />
        <GlobalStyle />
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
