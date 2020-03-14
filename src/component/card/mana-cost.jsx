import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Base = styled.div`
  display: flex;
`;

const ManaImage = styled.img`
  height: 12px;
  width: auto;
  border-radius: 9999px;
  box-shadow: -1px 1px 0 0 black;
`;

class ManaCost extends React.PureComponent {
  render() {
    const { className, label, imageUrl } = this.props;

    return (
      <Base className={className}>
        <ManaImage src={imageUrl} alt={label} />
      </Base>
    );
  }
}

ManaCost.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  imageUrl: PropTypes.string
};

ManaCost.defaultProps = {
  className: "",
  label: "",
  imageUrl: ""
};

export default ManaCost;
