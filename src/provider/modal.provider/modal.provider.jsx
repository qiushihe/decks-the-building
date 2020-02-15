import React from "react";
import PropTypes from "prop-types";

import Dialog from "@material-ui/core/Dialog";

import AddCardsToStack from "/src/component/modal/add-cards-to-stack";
import RenameObject from "/src/component/modal/rename-object";
import CloudSync from "/src/component/modal/cloud-sync";

import {
  ADD_CARDS_TO_STACK,
  RENAME_OBJECT,
  CLOUD_SYNC
} from "/src/enum/modal.enum";

const ALL_MODAL_COMPONENTS = {
  [ADD_CARDS_TO_STACK]: AddCardsToStack,
  [RENAME_OBJECT]: RenameObject,
  [CLOUD_SYNC]: CloudSync
};

export class ModalProvider extends React.PureComponent {
  render() {
    const { children, hasModal, modalName, modalProps, hide } = this.props;

    let renderedModal = null;
    if (hasModal) {
      const ModalComponent = ALL_MODAL_COMPONENTS[modalName];
      if (ModalComponent !== null) {
        renderedModal = (
          <Dialog
            open={true}
            onClose={hide}
            disableBackdropClick={true}
            onEscapeKeyDown={hide}
          >
            <ModalComponent {...modalProps} hideModal={hide} />
          </Dialog>
        );
      }
    }

    return (
      <React.Fragment>
        {children}
        {renderedModal}
      </React.Fragment>
    );
  }
}

ModalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  hasModal: PropTypes.bool,
  modalName: PropTypes.string,
  modalProps: PropTypes.object,
  hide: PropTypes.func
};

ModalProvider.defaultProps = {
  children: null,
  hasModal: false,
  modalName: "",
  modalProps: {},
  hide: () => {}
};

export default ModalProvider;
