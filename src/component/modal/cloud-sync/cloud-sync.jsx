import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BaseModal from "/src/component/modal/base";

import LoginForm from "./login-form";
import SyncOperationForm from "./sync-operation-form";

const Base = styled.div``;

export class CloudSync extends React.PureComponent {
  render() {
    const { hideModal, hasLogin } = this.props;

    return (
      <BaseModal>
        <Base>
          {hasLogin ? (
            <SyncOperationForm doneSync={hideModal} />
          ) : (
            <LoginForm cancelLogin={hideModal} />
          )}
        </Base>
      </BaseModal>
    );
  }
}

CloudSync.propTypes = {
  hideModal: PropTypes.func,
  hasLogin: PropTypes.bool
};

CloudSync.defaultProps = {
  hideModal: () => {},
  hasLogin: false
};

export default CloudSync;
