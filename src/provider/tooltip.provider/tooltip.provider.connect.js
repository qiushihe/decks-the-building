import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { hide } from "/src/action/tooltip.action";

import {
  hasActiveTooltip,
  activeTooltipId
} from "/src/selector/tooltip.selector";

import TooltipProvider from "./tooltip.provider";

export default connect(
  createStructuredSelector({
    hasTooltip: hasActiveTooltip,
    tooltipId: activeTooltipId
  }),
  dispatch => ({
    hide: () => dispatch(hide())
  })
)(TooltipProvider);
