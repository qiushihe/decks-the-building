import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import BaseModal from "/src/component/modal/base";

const Base = styled.div``;

export class AddCardsToStack extends React.PureComponent {
  render() {
    const { hideModal } = this.props;
    return (
      <BaseModal>
        <Base>
          <button onClick={hideModal}>Close</button>
        </Base>
      </BaseModal>
    );
  }
}

AddCardsToStack.propTypes = {
  hideModal: PropTypes.func
};

AddCardsToStack.defaultProps = {
  hideModal: () => {}
};

export default AddCardsToStack;
