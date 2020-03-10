import React from "react";
import PropTypes from "prop-types";

import BaseTooltip from "/src/component/tooltip/base";

export class WorkspaceMenu extends React.PureComponent {
  render() {
    const { tooltipId, target } = this.props;

    return (
      <BaseTooltip
        tooltipId={tooltipId}
        target={target}
        region="bottom"
        padded={false}
      >
        Workspace Menu Please Ignore
      </BaseTooltip>
    );
  }
}

WorkspaceMenu.propTypes = {
  tooltipId: PropTypes.string,
  target: PropTypes.object
};

WorkspaceMenu.defaultProps = {
  tooltipId: "",
  target: {}
};

export default WorkspaceMenu;
