import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import get from "lodash/fp/get";
import map from "lodash/fp/map";
import isEmpty from "lodash/fp/isEmpty";

import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import BaseModal from "/src/component/modal/base";
import AddCardsField from "/src/component/add-cards-field";

const StyledAddCardsField = styled(AddCardsField)`
  width: 420px;
`;

export class AddCardsToStack extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      cardNames: [],
      tabIndex: 0
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddCard = this.handleAddCard.bind(this);
  }

  handleTabChange(_, index) {
    this.setState({
      cardNames: [],
      tabIndex: index
    });
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
    const { tabIndex, cardNames } = this.state;

    return (
      <BaseModal
        renderActions={() => (
          <React.Fragment>
            <Button onClick={this.handleCancel} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={this.handleAddCard}
              color="primary"
              disabled={isEmpty(cardNames)}
            >
              {tabIndex === 0 ? "Add" : "Import"}
            </Button>
          </React.Fragment>
        )}
      >
        <Tabs value={tabIndex} onChange={this.handleTabChange}>
          <Tab label={tabIndex === 0 ? "Add Cards to Stack" : "Add Cards"} />
          <Tab
            label={tabIndex === 1 ? "Import Cards to Stack" : "Import Cards"}
          />
        </Tabs>
        {tabIndex === 0 && (
          <StyledAddCardsField onChange={this.handleFieldChange} />
        )}
        {tabIndex === 1 && <div>Shits ain&apos;t done yo!</div>}
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
