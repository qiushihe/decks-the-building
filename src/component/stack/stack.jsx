import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container } from "react-smooth-dnd";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";
import { Layers } from "react-feather";

import Card from "/src/component/card";

import { CARD_DEFAULT_SCALE, CARD_WIDTH } from "/src/config";
import omit from "lodash/fp/omit";

const uncappedMap = map.convert({ cap: false });

const Base = styled(props => {
  const componentProps = omit(["scale"])(props);
  return <div {...componentProps} />;
})`
  min-width: ${flow([get("scale"), multiply(CARD_WIDTH)])}px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StackIcon = styled(Layers)`
  width: 16px;
  height: 16px;
`;

class Stack extends React.PureComponent {
  render() {
    const { className, scale, stackId, label, cardIds } = this.props;
    return (
      <Base className={className} scale={scale}>
        <div>
          <StackIcon /> {label}
        </div>
        <Container shouldAcceptDrop={() => true}>
          {uncappedMap((cardId, index) => (
            <StyledCard
              key={`${index}-${cardId}`}
              stackId={stackId}
              cardId={cardId}
            />
          ))(cardIds)}
        </Container>
      </Base>
    );
  }
}

Stack.propTypes = {
  className: PropTypes.string,
  scale: PropTypes.number,
  stackId: PropTypes.string,
  label: PropTypes.string,
  cardIds: PropTypes.array
};

Stack.defaultProps = {
  className: "",
  scale: CARD_DEFAULT_SCALE,
  stackId: "",
  label: "Stack",
  cardIds: []
};

export default Stack;
