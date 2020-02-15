import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import get from "lodash/fp/get";
import map from "lodash/fp/map";

import Arrange from "/src/component/arrange";
import BaseModal from "/src/component/modal/base";
import AddCardsField from "/src/component/add-cards-field";

const Header = styled.div``;

const StyledAddCardsField = styled(AddCardsField)`
  width: 420px;
`;

export class AddCardsToStack extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      cardNames: ""
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
  }

  handleFieldChange({ cards }) {
    this.setState({
      cardNames: map(get("name"))(cards)
    });
  }

  handleCancel() {
    const { hideModal } = this.props;
    hideModal();
  }

  handleAddCard() {
    const { onSubmit } = this.props;
    const { cardNames } = this.state;
    onSubmit(cardNames);
  }

  render() {
    return (
      <BaseModal>
        <Header>Add Cards to Stack</Header>
        <StyledAddCardsField onChange={this.handleFieldChange} />
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
