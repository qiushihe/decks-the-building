import React from "react";
import PropTypes from "prop-types";

import WorkspaceHeader from "/src/component/workspace-header";
import Lanes from "/src/component/lanes";

class Workspace extends React.PureComponent {
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

Workspace.propTypes = {
  workspaceId: PropTypes.string
};

Workspace.defaultProps = {
  workspaceId: ""
};

export default Workspace;
