import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import join from "lodash/fp/join";
import split from "lodash/fp/split";

const Base = styled.div``;

const StyledTextArea = styled.textarea`
  display: block;
  width: 100%;
  height: 200px;
  min-height: 100px;
  max-height: 400px;
  overflow: auto;
  resize: vertical;
`;

class ImportCardsField extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      fieldValue: ""
    };

    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(evt) {
    const { onChange } = this.props;
    const fieldValue = evt.target.value;

    this.setState({ fieldValue }, () => {
      flow([
        split("\n"),
        map(name => ({ name })),
        cards => onChange({ cards })
      ])(fieldValue);
    });
  }

  render() {
    const { className } = this.props;
    const { fieldValue } = this.state;

    const placeholderText = join(String.fromCharCode(10))([
      "Enter card names here.",
      "",
      "One card name per line:",
      "Sol Ring",
      "Dream Trawler",
      "Path to Exile",
      "",
      "To add more than 1 copy per line:",
      "2 Sol Ring",
      "4x Dream Trawler",
      "6 x Path to Exile"
    ]);

    return (
      <Base className={className}>
        <StyledTextArea
          placeholder={placeholderText}
          value={fieldValue}
          onChange={this.handleFieldChange}
        />
      </Base>
    );
  }
}

ImportCardsField.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
};

ImportCardsField.defaultProps = {
  className: "",
  onChange: () => {}
};

export default ImportCardsField;
