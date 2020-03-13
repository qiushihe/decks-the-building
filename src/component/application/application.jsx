import React from "react";
import PropTypes from "prop-types";

import Workspace from "/src/component/workspace";

class Application extends React.PureComponent {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    const { workspaceId } = this.props;
    return (
      <React.Fragment>
        <Workspace workspaceId={workspaceId} />
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
