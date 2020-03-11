import React from "react";
import PropTypes from "prop-types";

import BaseTooltip from "/src/component/tooltip/base";
import { MenuBase, MenuItem } from "/src/component/tooltip/base-menu";

export class WorkspaceMenu extends React.PureComponent {
  render() {
    const {
      tooltipId,
      target,
      renameWorkspace,
      saveWorkspace,
      createWorkspace,
      removeWorkspace,
      syncWithCloud
    } = this.props;

    return (
      <BaseTooltip
        tooltipId={tooltipId}
        target={target}
        region="bottom"
        padded={false}
      >
        <MenuBase>
          <MenuItem onClick={renameWorkspace}>Rename Workspace</MenuItem>
          <MenuItem onClick={saveWorkspace}>Save Workspace</MenuItem>
          <MenuItem onClick={syncWithCloud}>Sync Workspace</MenuItem>
          <MenuItem onClick={removeWorkspace}>Delete Workspace</MenuItem>
          <MenuItem onClick={createWorkspace}>Create Workspace</MenuItem>
        </MenuBase>
      </BaseTooltip>
    );
  }
}

WorkspaceMenu.propTypes = {
  tooltipId: PropTypes.string,
  target: PropTypes.object,
  renameWorkspace: PropTypes.func,
  saveWorkspace: PropTypes.func,
  createWorkspace: PropTypes.func,
  removeWorkspace: PropTypes.func,
  syncWithCloud: PropTypes.func
};

WorkspaceMenu.defaultProps = {
  tooltipId: "",
  target: {},
  renameWorkspace: () => {},
  saveWorkspace: () => {},
  createWorkspace: () => {},
  removeWorkspace: () => {},
  syncWithCloud: () => {}
};

export default WorkspaceMenu;
