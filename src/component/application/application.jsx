import React from "react";
import PropTypes from "prop-types";

class Application extends React.PureComponent {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    return <h1>Application Yo!</h1>;
  }
}

Application.propTypes = {
  onMount: PropTypes.func
};

Application.defaultProps = {
  onMount: () => {}
};

export default Application;
