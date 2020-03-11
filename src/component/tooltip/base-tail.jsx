import React from "react";
import PropTypes from "prop-types";
import pickBy from "lodash/fp/pickBy";
import identity from "lodash/fp/identity";

import DefaultVariant from "./default-variant.style";

export class BaseTooltipTail extends React.PureComponent {
  render() {
    const { children, tooltipId, style, result } = this.props;
    const Variant = DefaultVariant;

    // The `style` object is passed into this component from FlowTip and during some initial
    // cycles of its calculation could have things like `top: null` in it which is not valid
    // value for CSS attributes and would cause error from `styled-components` to be logged
    // in the console, which is a lot of noise. So here we first clean it up before using it.
    const cleanedUpStyled = pickBy(identity)(style);

    return (
      <Variant.TailBase
        data-tooltip-id={tooltipId}
        region={result.region}
        style={cleanedUpStyled}
      >
        <Variant.PointerContainer region={result.region}>
          <Variant.Pointer region={result.region} />
        </Variant.PointerContainer>
        {children}
      </Variant.TailBase>
    );
  }
}

BaseTooltipTail.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  tooltipId: PropTypes.string,
  style: PropTypes.object,
  result: PropTypes.object
};

BaseTooltipTail.defaultProps = {
  children: null,
  tooltipId: "",
  style: {},
  region: {}
};

export default BaseTooltipTail;
