import React from "react";
import PropTypes from "prop-types";

import BaseTooltip from "/src/component/tooltip/base";

export class StackMenu extends React.PureComponent {
  render() {
    const { tooltipId, target } = this.props;

    return (
      <BaseTooltip
        tooltipId={tooltipId}
        target={target}
        region="bottom"
        padded={false}
      >
        Stack Menu Please Ignore
      </BaseTooltip>
    );
  }
}

StackMenu.propTypes = {
  tooltipId: PropTypes.string,
  target: PropTypes.object
};

StackMenu.defaultProps = {
  tooltipId: "",
  target: {}
};

export default StackMenu;
