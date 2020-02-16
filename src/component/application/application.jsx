import React from "react";
import PropTypes from "prop-types";

import WorkspaceHeader from "/src/component/workspace-header";
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
        <WorkspaceHeader workspaceId={workspaceId} />
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
