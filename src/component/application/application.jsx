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
      <div>
        <S3Login />
        <Lanes />
      </div>
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
