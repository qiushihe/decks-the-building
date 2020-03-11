import React from "react";
import PropTypes from "prop-types";

import BaseTooltip from "/src/component/tooltip/base";
import { MenuBase, MenuItem } from "/src/component/tooltip/base-menu";

export class LaneMenu extends React.PureComponent {
  render() {
    const {
      tooltipId,
      target,
      renameLane,
      createLane,
      removeLane
    } = this.props;

    return (
      <BaseTooltip
        tooltipId={tooltipId}
        target={target}
        region="bottom"
        padded={false}
      >
        <MenuBase>
          <MenuItem onClick={renameLane}>Rename Lane</MenuItem>
          <MenuItem onClick={removeLane}>Delete Lane</MenuItem>
          <MenuItem onClick={createLane}>Create Lane</MenuItem>
        </MenuBase>
      </BaseTooltip>
    );
  }
}

LaneMenu.propTypes = {
  tooltipId: PropTypes.string,
  target: PropTypes.object,
  renameLane: PropTypes.func,
  createLane: PropTypes.func,
  removeLane: PropTypes.func
};

LaneMenu.defaultProps = {
  tooltipId: "",
  target: {},
  renameLane: () => {},
  createLane: () => {},
  removeLane: () => {}
};

export default LaneMenu;
