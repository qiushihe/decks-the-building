import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Card from "/src/component/card";

const uncappedMap = map.convert({ cap: false });

const Base = styled.div``;

class Stack extends React.PureComponent {
  render() {
    const { label, cardIds } = this.props;
    return (
      <Base>
        <h1>Stack: {label}</h1>
        <Container shouldAcceptDrop={() => true}>
          {uncappedMap((cardId, index) => (
            <Card key={`${index}-${cardId}`} cardId={cardId} />
          ))(cardIds)}
        </Container>
      </Base>
    );
  }
}

Stack.propTypes = {
  label: PropTypes.string,
  cardIds: PropTypes.array
};

Stack.defaultProps = {
  label: "Stack",
  cardIds: []
};

export default Stack;
