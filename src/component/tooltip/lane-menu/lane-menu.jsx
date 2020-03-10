import React from "react";
import PropTypes from "prop-types";

import BaseTooltip from "/src/component/tooltip/base";

export class LaneMenu extends React.PureComponent {
  render() {
    const { tooltipId, target } = this.props;

    return (
      <BaseTooltip
        tooltipId={tooltipId}
        target={target}
        region="bottom"
        padded={false}
      >
        Lane Menu Please Ignore
      </BaseTooltip>
    );
  }
}

LaneMenu.propTypes = {
  tooltipId: PropTypes.string,
  target: PropTypes.object
};

LaneMenu.defaultProps = {
  tooltipId: "",
  target: {}
};

export default LaneMenu;
