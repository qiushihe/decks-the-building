import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Base = styled.div`
  background-color: #ffffff;
  padding: 12px;
  border-radius: 12px;
`;

export class BaseModal extends React.PureComponent {
  render() {
    const { children } = this.props;

    return <Base>{children}</Base>;
  }
}

BaseModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

BaseModal.defaultProps = {
  children: null
};

export default BaseModal;
