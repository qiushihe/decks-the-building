import React from "react";
import PropTypes from "prop-types";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({});

export class MaterialUiProvider extends React.PureComponent {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <CssBaseline />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </React.Fragment>
    );
  }
}

MaterialUiProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

MaterialUiProvider.defaultProps = {
  children: null
};

export default MaterialUiProvider;
