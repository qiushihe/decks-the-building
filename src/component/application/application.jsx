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
    const { workspaceId } = this.props;
    return (
      <React.Fragment>
        <S3Login />
        <Lanes workspaceId={workspaceId} />
      </React.Fragment>
    );
  }
}

Application.propTypes = {
  workspaceId: PropTypes.string,
  onMount: PropTypes.func
};

Application.defaultProps = {
  workspaceId: "",
  onMount: () => {}
};

export default Application;
