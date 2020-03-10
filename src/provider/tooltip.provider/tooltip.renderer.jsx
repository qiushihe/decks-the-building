import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/fp/isEmpty";

import WorkspaceMenu from "/src/component/tooltip/workspace-menu";
import LaneMenu from "/src/component/tooltip/lane-menu";
import StackMenu from "/src/component/tooltip/stack-menu";

import { WORKSPACE_MENU, LANE_MENU, STACK_MENU } from "/src/enum/tooltip.enum";

const ALL_TOOLTIP_COMPONENTS = {
  [WORKSPACE_MENU]: WorkspaceMenu,
  [LANE_MENU]: LaneMenu,
  [STACK_MENU]: StackMenu
};

export class TooltipRenderer extends React.PureComponent {
  render() {
    const { target, tooltipId, tooltipName, tooltipProps } = this.props;

    const TooltipComponent = ALL_TOOLTIP_COMPONENTS[tooltipName];

    if (!isEmpty(target) && TooltipComponent) {
      return (
        <TooltipComponent
          {...tooltipProps}
          tooltipId={tooltipId}
          target={target}
        />
      );
    } else {
      return null;
    }
  }
}

TooltipRenderer.propTypes = {
  target: PropTypes.object,
  tooltipId: PropTypes.string,
  tooltipName: PropTypes.string,
  tooltipProps: PropTypes.object
};

TooltipRenderer.defaultProps = {
  target: {},
  tooltipId: "",
  tooltipName: "",
  tooltipProps: {}
};

export default TooltipRenderer;
