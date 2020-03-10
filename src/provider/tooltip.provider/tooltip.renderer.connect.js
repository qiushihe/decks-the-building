import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  activeTooltipName,
  activeTooltipProps
} from "/src/selector/tooltip.selector";

import TooltipRenderer from "./tooltip.renderer";

export default connect(
  createStructuredSelector({
    tooltipName: activeTooltipName,
    tooltipProps: activeTooltipProps
  })
)(TooltipRenderer);
