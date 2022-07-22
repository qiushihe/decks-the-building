import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import map from "lodash/fp/map";
import isEmpty from "lodash/fp/isEmpty";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import constant from "lodash/fp/constant";
import stubTrue from "lodash/fp/stubTrue";

import { STACK_CARDS_SPACING } from "/src/config";
import Card from "/src/component/card";

const uncappedMap = map.convert({ cap: false });

const Base = memo(styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: ${STACK_CARDS_SPACING - 1}px ${STACK_CARDS_SPACING}px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 3px 6px -3px rgba(0, 0, 0, 0.2);
  min-height: ${cond([
    [get("isEmpty"), constant(100)],
    [stubTrue, constant(0)]
  ])}px;

  & > .smooth-dnd-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }
`);

const CardContainer = memo(styled.div`
  margin: 1px 0;
`);

class Cards extends React.PureComponent {
  render() {
    const { className, stackId, cardIds, moveCard } = this.props;

    return (
      <Base className={className} isEmpty={isEmpty(cardIds)}>
        <Container
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
            <Draggable key={index}>
              <CardContainer>
                <Card stackId={stackId} cardId={cardId} cardIndex={index} />
              </CardContainer>
            </Draggable>
          ))(cardIds)}
        </Container>
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
