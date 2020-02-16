import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactTags from "react-tag-autocomplete";

import { removeItem } from "/src/util/array.util";
import { getRandomId } from "/src/util/random-id.util";

import { getReactTagsStyles } from "./react-tags.style";
import CardTag from "./card-tag";

const {
  styles: ReactTagsStyles,
  classNames: reactTagsClassNames
} = getReactTagsStyles();

const Base = styled.div`
  ${ReactTagsStyles}
`;

class AddCardsField extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      cards: []
    };

    this.rootRef = React.createRef();
    this.inputId = getRandomId(12, 62);
    this.inputElm = null;
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

  componentDidMount() {
    const { current: rootElm } = this.rootRef;

    if (rootElm) {
      this.inputElm = rootElm.querySelector(
        `[data-input-id="${this.inputId}"]`
      );

      if (this.inputElm) {
        this.inputElm.focus();
      }
    }
  }

  render() {
    const { className, suggestions } = this.props;
    const { cards } = this.state;

    return (
      <Base className={className} ref={this.rootRef}>
        <ReactTags
          classNames={reactTagsClassNames}
          tags={cards}
          suggestions={suggestions}
          tagComponent={CardTag}
          onDelete={this.handleDelete}
          onAddition={this.handleAddition}
          allowBackspace={false}
          clearInputOnDelete={false}
          placeholderText="Find a card by name ..."
          noSuggestionsText="Do you even Hearthstone?"
          inputAttributes={{
            "data-input-id": this.inputId
          }}
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
