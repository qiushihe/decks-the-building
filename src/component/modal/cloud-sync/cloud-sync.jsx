import React from "react";
import PropTypes from "prop-types";

import LoginForm from "./login-form";
import SyncOperationForm from "./sync-operation-form";

export class CloudSync extends React.PureComponent {
  render() {
    const { hideModal, hasLogin } = this.props;

    return hasLogin ? (
      <SyncOperationForm
        onComplete={hideModal}
        onCancel={hideModal}
        onSignOut={hideModal}
      />
    ) : (
      <LoginForm cancelLogin={hideModal} />
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
