import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BaseModal from "/src/component/modal/base";

const Base = styled.div``;

export class CloudSync extends React.PureComponent {
  render() {
    return (
      <BaseModal>
        <Base>Oh Hai!</Base>
      </BaseModal>
    );
  }
}

CloudSync.propTypes = {
  hideModal: PropTypes.func
};

CloudSync.defaultProps = {
  hideModal: () => {}
};

export default CloudSync;
