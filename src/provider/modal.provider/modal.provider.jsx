import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";

import AddCardsToStack from "/src/component/modal/add-cards-to-stack";
import RenameObject from "/src/component/modal/rename-object";
import RemoveObject from "/src/component/modal/remove-object";
import CloudSync from "/src/component/modal/cloud-sync";
import ExportCards from "/src/component/modal/export-cards";
import { MODAL } from "/src/enum/global-z-index.enum";

import {
  ADD_CARDS_TO_STACK,
  RENAME_OBJECT,
  REMOVE_OBJECT,
  CLOUD_SYNC,
  EXPORT_CARDS
} from "/src/enum/modal.enum";

const ALL_MODAL_COMPONENTS = {
  [ADD_CARDS_TO_STACK]: AddCardsToStack,
  [RENAME_OBJECT]: RenameObject,
  [REMOVE_OBJECT]: RemoveObject,
  [CLOUD_SYNC]: CloudSync,
  [EXPORT_CARDS]: ExportCards
};

const Base = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${MODAL};

  .MuiDialog-paper {
    overflow-y: visible !important;
  }
`;

export class ModalProvider extends React.PureComponent {
  render() {
    const { children, hasModal, modalName, modalProps, hide } = this.props;

    let renderedModal = null;
    if (hasModal) {
      const ModalComponent = ALL_MODAL_COMPONENTS[modalName];
      if (ModalComponent !== null) {
        renderedModal = (
          <Base>
            <Dialog
              open={true}
              disablePortal={true}
              onClose={hide}
              disableBackdropClick={true}
              onEscapeKeyDown={hide}
            >
              <ModalComponent {...modalProps} hideModal={hide} />
            </Dialog>
          </Base>
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
