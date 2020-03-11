import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { hide } from "/src/action/modal.action";

import {
  hasActiveModal,
  activeModalName,
  activeModalProps
} from "/src/selector/modal.selector";

import ModalProvider from "./modal.provider";

export default connect(
  createStructuredSelector({
    hasModal: hasActiveModal,
    modalName: activeModalName,
    modalProps: activeModalProps
  }),
  dispatch => ({
    hide: () => dispatch(hide())
  })
)(ModalProvider);
