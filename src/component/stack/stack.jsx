import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Container, Draggable } from "react-smooth-dnd";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";
import omit from "lodash/fp/omit";
import {
  Layers,
  Edit,
  FilePlus,
  Trash2,
  PlusCircle,
  Package
} from "react-feather";

import { CARD_DEFAULT_SCALE, CARD_WIDTH } from "/src/config";
import Arrange from "/src/component/arrange";
import Card from "/src/component/card";

const uncappedMap = map.convert({ cap: false });

const Content = styled(props => {
  const componentProps = omit(["scale"])(props);
  return <div {...componentProps} />;
})`
  min-width: ${flow([get("scale"), multiply(CARD_WIDTH)])}px;
  margin: 0 8px;
`;

const Base = styled(Draggable)`
  &:first-child ${Content} {
    margin-left: 0;
  }

  &:last-child ${Content} {
    margin-right: 0;
  }
`;

const StyledCard = styled(Card)``;

const IconStyle = css`
  width: 16px;
  height: 16px;
`;

const StackIcon = styled(Layers)`
  ${IconStyle}
`;

const RenameStackIcon = styled(Edit)`
  ${IconStyle}
`;

const AddCardIcon = styled(FilePlus)`
  ${IconStyle}
`;

const DeleteStackIcon = styled(Trash2)`
  ${IconStyle}
`;

const TidyStackIcon = styled(Package)`
  ${IconStyle}
`;

const CreateStackIcon = styled(PlusCircle)`
  ${IconStyle}
`;

class Stack extends React.PureComponent {
  render() {
    const { className, scale, stackId, label, cardIds, moveCard } = this.props;
    return (
      <Base className={className} scale={scale}>
        <Content scale={scale}>
          <Arrange>
            <Arrange.Fit>
              <StackIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fill>{label} </Arrange.Fill>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <RenameStackIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <AddCardIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <TidyStackIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <DeleteStackIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;</Arrange.Fit>
            <Arrange.Fit>
              <CreateStackIcon />
            </Arrange.Fit>
            <Arrange.Fit>&nbsp;&nbsp;&nbsp;</Arrange.Fit>
          </Arrange>
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
              <StyledCard
                key={`${index}-${cardId}`}
                stackId={stackId}
                cardId={cardId}
                cardIndex={index}
              />
            ))(cardIds)}
          </Container>
        </Content>
      </Base>
    );
  }
}

Stack.propTypes = {
  className: PropTypes.string,
  scale: PropTypes.number,
  stackId: PropTypes.string,
  label: PropTypes.string,
  cardIds: PropTypes.array,
  moveCard: PropTypes.func
};

Stack.defaultProps = {
  className: "",
  scale: CARD_DEFAULT_SCALE,
  stackId: "",
  label: "Stack",
  cardIds: [],
  moveCard: () => {}
};

export default Stack;
