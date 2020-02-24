import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import omit from "lodash/fp/omit";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import eq from "lodash/fp/eq";
import stubTrue from "lodash/fp/stubTrue";
import constant from "lodash/fp/constant";

const Base = styled(props => {
  const { imageUrl, title } = props;
  const componentProps = omit(["imageUrl", "title", "layout", "alternation"])(
    props
  );
  return <img {...componentProps} src={imageUrl} alt={title} />;
})`
  display: block;
  pointer-events: none;
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: 0;
  transform: ${cond([
    [
      flow([get("layout"), eq("flip")]),
      flow([
        get("alternation"),
        cond([
          [flow([value => value % 2, eq(0)]), constant("none")],
          [stubTrue, constant("rotate(180deg)")]
        ])
      ])
    ],
    [stubTrue, constant("none")]
  ])};
`;

class FullImage extends React.PureComponent {
  render() {
    const { className, name, imageUrl, layout, alternation } = this.props;

    return (
      <Base
        className={className}
        name={name}
        imageUrl={imageUrl}
        layout={layout}
        alternation={alternation}
      />
    );
  }
}

FullImage.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  layout: PropTypes.string,
  alternation: PropTypes.number
};

FullImage.defaultProps = {
  className: "",
  name: "Card",
  imageUrl: "",
  layout: "",
  alternation: 0
};

export default FullImage;
