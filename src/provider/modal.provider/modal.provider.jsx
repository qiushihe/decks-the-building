import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import addClass from "add-class";
import removeClass from "remove-class";
import forEach from "lodash/fp/forEach";

import AddCardsToStack from "/src/component/modal/add-cards-to-stack";
import { ADD_CARDS_TO_STACK } from "/src/enum/modal.enum";

const ALL_MODAL_COMPONENTS = {
  [ADD_CARDS_TO_STACK]: AddCardsToStack
};

const DisableScrollStyle = createGlobalStyle`
  .modal-provider-disable-scroll {
    pointer-events: none;
  }
`;

const Backdrop = styled.div`
  display: flex;
  flex: 1 1 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  opacity: 0.75;
  z-index: 9998;
  pointer-events: none;
`;

const ModalContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`;

export class ModalProvider extends React.PureComponent {
  componentDidMount() {
    const { hasModal } = this.props;
    if (hasModal) {
      this.lockScroll();
    } else if (!hasModal) {
      this.unlockScroll();
    }
  }

  componentDidUpdate({ hasModal: hadModal }) {
    const { hasModal } = this.props;
    if (!hadModal && hasModal) {
      this.lockScroll();
    } else if (hadModal && !hasModal) {
      this.unlockScroll();
    }
  }

  lockScroll() {
    forEach(el => {
      addClass(el, "modal-provider-disable-scroll");
    })(document.querySelectorAll("[data-scrollable]"));
  }

  unlockScroll() {
    forEach(el => {
      removeClass(el, "modal-provider-disable-scroll");
    })(document.querySelectorAll("[data-scrollable]"));
  }

  render() {
    const { children, hasModal, modalName, modalProps, hide } = this.props;

    let renderedModal = null;
    if (hasModal) {
      const ModalComponent = ALL_MODAL_COMPONENTS[modalName];
      if (ModalComponent !== null) {
        renderedModal = (
          <React.Fragment>
            <Backdrop />
            <ModalContainer>
              <ModalComponent {...modalProps} hideModal={hide} />
            </ModalContainer>
          </React.Fragment>
        );
      }
    }

    return (
      <React.Fragment>
        <DisableScrollStyle />
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
