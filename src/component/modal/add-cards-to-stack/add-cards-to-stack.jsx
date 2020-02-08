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
  constructor(...args) {
    super(...args);

    this.state = {
      fieldValue: ""
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
  }

  handleFieldChange(evt) {
    this.setState({
      fieldValue: evt.target.value
    });
  }

  handleCancel() {
    const { hideModal } = this.props;
    hideModal();
  }

  handleAddCard() {
    const { onSubmit } = this.props;
    const { fieldValue } = this.state;
    onSubmit(fieldValue);
  }

  render() {
    const { fieldValue } = this.state;

    return (
      <BaseModal>
        <Arrange vertical={true}>
          <Arrange.Fit>
            <Header>Add Cards to Stack</Header>
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <StyledTextarea
              value={fieldValue}
              onChange={this.handleFieldChange}
            />
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <Arrange>
              <Arrange.Fill>&nbsp;</Arrange.Fill>
              <Arrange.Fit>
                <button onClick={this.handleCancel}>Cancel</button>
              </Arrange.Fit>
              <Arrange.Fit>&nbsp;&nbsp;</Arrange.Fit>
              <Arrange.Fit>
                <button onClick={this.handleAddCard}>Add</button>
              </Arrange.Fit>
            </Arrange>
          </Arrange.Fit>
        </Arrange>
      </BaseModal>
    );
  }
}

AddCardsToStack.propTypes = {
  hideModal: PropTypes.func,
  onSubmit: PropTypes.func
};

AddCardsToStack.defaultProps = {
  hideModal: () => {},
  onSubmit: () => {}
};

export default AddCardsToStack;
