import React from "react";
import PropTypes from "prop-types";

import DefaultVariant from "./default-variant.style";

export class BaseTooltipContent extends React.PureComponent {
  render() {
    const { children, tooltipId, style, padded } = this.props;
    const Variant = DefaultVariant;

    return (
      <Variant.ContentBase
        data-tooltip-id={tooltipId}
        style={style}
        padded={padded}
      >
        {children}
      </Variant.ContentBase>
    );
  }
}

BaseTooltipContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  tooltipId: PropTypes.string,
  style: PropTypes.object,
  padded: PropTypes.bool
};

BaseTooltipContent.defaultProps = {
  children: null,
  tooltipId: "",
  style: {},
  padded: false
};

export default BaseTooltipContent;
