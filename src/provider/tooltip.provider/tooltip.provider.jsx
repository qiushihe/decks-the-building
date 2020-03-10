import React from "react";
import PropTypes from "prop-types";
import ResizeObserver from "react-resize-observer";
import flow from "lodash/fp/flow";
import eq from "lodash/fp/eq";
import every from "lodash/fp/every";
import negate from "lodash/fp/negate";
import pick from "lodash/fp/pick";
import keys from "lodash/fp/keys";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import compact from "lodash/fp/compact";
import isFunction from "lodash/fp/isFunction";
import isEmpty from "lodash/fp/isEmpty";
import includes from "lodash/fp/includes";
import debounce from "lodash/fp/debounce";
import reduce, { convert as convertReduce } from "lodash/fp/reduce";

import { TargetShape } from "/src/component/tooltip/base";

import TooltipRenderer from "./tooltip.renderer.connect";

const REFLOW_UPDATE_INTERVAL = 100;

const uncappedReduce = convertReduce({ cap: false });
const getRectAttributes = flow([keys, pick])(TargetShape);

const rectsDiff = (rectA, rectB) =>
  flow([
    keys,
    map(get),
    map(getProp => [getProp(rectA), getProp(rectB)]),
    map(values => eq(...values)),
    negate(every(Boolean))
  ])(TargetShape);

export class TooltipProvider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      targetRectsById: {}
    };

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentScroll = this.handleDocumentScroll.bind(this);
    this.handleReflow = debounce(REFLOW_UPDATE_INTERVAL)(
      this.handleReflow.bind(this)
    );
  }

  componentDidMount() {
    this.updateTargetRects();
    document.addEventListener("click", this.handleDocumentClick);
    document.addEventListener("scroll", this.handleDocumentScroll, true);
  }

  componentDidUpdate() {
    this.updateTargetRects();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
    document.removeEventListener("scroll", this.handleDocumentScroll, true);
  }

  handleDocumentClick(evt) {
    if (!evt || !evt.target || !isFunction(evt.target.closest)) {
      return;
    }

    const { hide, tooltipId } = this.props;

    // For now we only support 1 tooltip ID so use a array to keep the rest of the logic unchanged
    // from the logic required to support multiple tooltip IDs.
    const tooltipIds = compact([tooltipId]);

    const clickedTooltip = evt.target.closest("[data-tooltip-id]");

    if (!clickedTooltip && !isEmpty(tooltipIds)) {
      hide();
    }
  }

  handleDocumentScroll(evt) {
    const { hasTooltip, hide } = this.props;

    if (
      !!evt &&
      !!evt.target &&
      !!evt.target.getAttribute("data-tooltip-scrollable") &&
      hasTooltip
    ) {
      hide();
    }
  }

  handleReflow() {
    const { hasTooltip, hide } = this.props;

    if (hasTooltip) {
      hide();
    }
  }

  updateTargetRects() {
    const { tooltipId } = this.props;
    let { targetRectsById } = this.state;
    let targetsChanged = false;

    // For now we only support 1 tooltip ID so use a array to keep the rest of the logic unchanged
    // from the logic required to support multiple tooltip IDs.
    const tooltipIds = compact([tooltipId]);

    // Add/Update new targets
    targetRectsById = reduce((result, id) => {
      const target = document.querySelector(`[data-tooltip-trigger="${id}"]`);

      if (!isFunction((target || {}).getBoundingClientRect)) {
        return result;
      } else {
        const newRect = getRectAttributes(target.getBoundingClientRect());
        const oldRect = result[id];
        const rectChanged = rectsDiff(newRect, oldRect);

        if (rectChanged) {
          targetsChanged = true;
        }

        return {
          ...result,
          [id]: rectChanged ? newRect : oldRect
        };
      }
    }, targetRectsById)(tooltipIds);

    // Remove stale targets
    targetRectsById = uncappedReduce((result, rect, id) => {
      if (includes(id)(tooltipIds)) {
        return { ...result, [id]: rect };
      } else {
        targetsChanged = true;
        return result;
      }
    }, {})(targetRectsById);

    if (targetsChanged) {
      this.setState({ targetRectsById });
    }
  }

  render() {
    const { children, hasTooltip, tooltipId } = this.props;

    const { targetRectsById } = this.state;

    const tooltipTarget = targetRectsById[tooltipId];
    const renderedTooltip =
      hasTooltip && !isEmpty(tooltipTarget) ? (
        <TooltipRenderer tooltipId={tooltipId} target={tooltipTarget} />
      ) : null;

    return (
      <React.Fragment>
        <ResizeObserver onReflow={this.handleReflow} />
        {children}
        {renderedTooltip}
      </React.Fragment>
    );
  }
}

TooltipProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  hasTooltip: PropTypes.bool,
  tooltipId: PropTypes.string,
  hide: PropTypes.func
};

TooltipProvider.defaultProps = {
  children: null,
  hasTooltip: false,
  tooltipId: "",
  hide: () => {}
};

export default TooltipProvider;
