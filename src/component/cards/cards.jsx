import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import map from "lodash/fp/map";

import { STACK_CARDS_SPACING } from "/src/config";
import Card from "/src/component/card";

const uncappedMap = map.convert({ cap: false });

const ContainerBase = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 100px !important;
  padding: ${STACK_CARDS_SPACING}px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 3px 6px -3px rgba(0, 0, 0, 0.2);
`;

const StyledCard = styled(Card)``;

const StyledDraggable = styled(Draggable)`
  overflow: visible !important;

  ${StyledCard} {
    padding: 2px 0;
  }

  &:first-child ${StyledCard} {
    padding-top: 0;
  }

  &:last-child ${StyledCard} {
    padding-bottom: 0;
  }
`;

class Cards extends React.PureComponent {
  render() {
    const { className, stackId, cardIds, moveCard } = this.props;

    return (
      <Container
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
        render={ref => (
          <ContainerBase ref={ref}>
            {uncappedMap((cardId, index) => (
              <StyledDraggable key={`${index}-${cardId}`}>
                <StyledCard
                  stackId={stackId}
                  cardId={cardId}
                  cardIndex={index}
                />
              </StyledDraggable>
            ))(cardIds)}
          </ContainerBase>
        )}
      />
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
