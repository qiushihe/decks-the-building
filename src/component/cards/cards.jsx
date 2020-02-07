import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "react-smooth-dnd";
import map from "lodash/fp/map";

import Card from "/src/component/card";

const uncappedMap = map.convert({ cap: false });

const Base = styled(Container)`
  display: flex;
  flex-direction: column;
`;

class Cards extends React.PureComponent {
  render() {
    const { className, stackId, cardIds, moveCard } = this.props;
    return (
      <Base
        className={className}
        groupName="card"
        getChildPayload={index => ({ stackId, cardIndex: index })}
        shouldAcceptDrop={({ groupName }) => groupName === "card"}
        onDrop={({ addedIndex, payload }) => {
          if (addedIndex !== null) {
            moveCard({
              fromId: payload.stackId,
              toId: stackId,
              fromCardIndex: payload.cardIndex,
              toCardIndex: addedIndex
            });
          }
        }}
      >
        {uncappedMap((cardId, index) => (
          <Card
            key={`${index}-${cardId}`}
            stackId={stackId}
            cardId={cardId}
            cardIndex={index}
          />
        ))(cardIds)}
      </Base>
    );
  }
}

Cards.propTypes = {
  className: PropTypes.string,
  stackId: PropTypes.string,
  cardIds: PropTypes.array,
  moveCard: PropTypes.func
};

Cards.defaultProps = {
  className: "",
  stackId: "",
  cardIds: [],
  moveCard: () => {}
};

export default Cards;
