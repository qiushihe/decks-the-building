import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Arrange from "/src/component/arrange";
import BaseModal from "/src/component/modal/base";

const Header = styled.div``;

const StyledTextarea = styled.textarea`
  width: 420px;
  height: 120px;
  white-space: nowrap;
  resize: none;
`;

export class AddCardsToStack extends React.PureComponent {
  render() {
    const { hideModal } = this.props;
    return (
      <BaseModal>
        <Arrange vertical={true}>
          <Arrange.Fit>
            <Header>Add Cards to Stack</Header>
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <StyledTextarea />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <Arrange>
              <Arrange.Fill>&nbsp;</Arrange.Fill>
              <Arrange.Fit>
                <button onClick={hideModal}>Close</button>
              </Arrange.Fit>
              <Arrange.Fit>&nbsp;&nbsp;</Arrange.Fit>
              <Arrange.Fit>
                <button onClick={() => {}}>Submit</button>
              </Arrange.Fit>
            </Arrange>
          </Arrange.Fit>
        </Arrange>
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
