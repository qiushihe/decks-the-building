import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactTags from "react-tag-autocomplete";

import { removeItem } from "/src/util/array.util";

import { ReactTagsStyles, ReactTagsClassNames } from "./react-tags.style";
import CardTag from "./card-tag";

const Base = styled.div`
  ${ReactTagsStyles}
`;

class AddCardsField extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      cards: []
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }

  handleDelete(index) {
    const { onChange } = this.props;
    const { cards } = this.state;
    const newCards = removeItem(index)(cards);

    this.setState({ cards: newCards }, () => {
      onChange({ cards: newCards });
    });
  }

  handleAddition(entry) {
    const { onChange } = this.props;
    const { cards } = this.state;
    const newCards = [...cards, entry];

    this.setState({ cards: newCards }, () => {
      onChange({ cards: newCards });
    });
  }

  render() {
    const { className, suggestions } = this.props;
    const { cards } = this.state;

    return (
      <Base className={className}>
        <ReactTags
          classNames={ReactTagsClassNames}
          tags={cards}
          suggestions={suggestions}
          tagComponent={CardTag}
          onDelete={this.handleDelete}
          onAddition={this.handleAddition}
          allowBackspace={false}
          clearInputOnDelete={false}
          placeholderText="Find a card by name ..."
          noSuggestionsText="Do you even Hearthstone?"
        />
      </Base>
    );
  }
}

AddCardsField.propTypes = {
  className: PropTypes.string,
  suggestions: PropTypes.array,
  onChange: PropTypes.func
};

AddCardsField.defaultProps = {
  className: "",
  suggestions: [],
  onChange: () => {}
};

export default AddCardsField;
