import React from "react";
import PropTypes from "prop-types";

import S3Login from "/src/component/s3-login";
import Lanes from "/src/component/lanes";

class Application extends React.PureComponent {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    return (
      <React.Fragment>
        <S3Login />
        <Lanes />
      </React.Fragment>
    );
  }
}

Application.propTypes = {
  onMount: PropTypes.func
};

Application.defaultProps = {
  onMount: () => {}
};

export default Application;
