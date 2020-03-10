import React from "react";
import PropTypes from "prop-types";
import FlowTip from "flowtip-react-dom";

import BaseTooltipContent from "./base-content";
import BaseTooltipTail from "./base-tail";

const withProps = additionalProps => Komponent => props => (
  <Komponent {...props} {...additionalProps} />
);

export class BaseTooltip extends React.PureComponent {
  render() {
    const { children, tooltipId, target, padded, region } = this.props;
    const withContentProps = withProps({ tooltipId, padded });
    const withTailProps = withProps({ tooltipId });

    return (
      <FlowTip
        target={target}
        content={withContentProps(BaseTooltipContent)}
        tail={withTailProps(BaseTooltipTail)}
        region={region}
        edgeOffset={10}
      >
        {children}
      </FlowTip>
    );
  }
}

export const TargetShape = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  right: PropTypes.number,
  bottom: PropTypes.number
};

BaseTooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  tooltipId: PropTypes.string,
  target: PropTypes.shape(TargetShape),
  padded: PropTypes.bool,
  region: PropTypes.oneOf(["top", "bottom", "left", "right"])
};

BaseTooltip.defaultProps = {
  children: null,
  tooltipId: "",
  target: {},
  padded: true,
  region: "bottom"
};

export default BaseTooltip;
