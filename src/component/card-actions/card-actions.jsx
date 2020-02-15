import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";

import {
  DuplicateIcon,
  AddOneIcon,
  SubtractOneIcon,
  ExpandIcon,
  CollapseIcon
} from "/src/component/icon";

const Base = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${get("size")}px;
  height: ${get("size")}px;
  margin: 2px;
  padding: 0;
  border-radius: 100%;
  background: #000000;
  box-shadow: 0 0 0 1px #ffffff;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const IconStyle = css`
  cursor: pointer;
  color: #ffffff;
`;

const makeCardIcon = IconComponent => styled(IconComponent).attrs(
  flow([get("size"), multiply(0.75), size => ({ size })])
)`
  ${IconStyle}
`;

const AddOneCardCopy = makeCardIcon(AddOneIcon);
const SubtractOneCardCopy = makeCardIcon(SubtractOneIcon);
const DuplicateCardEntry = makeCardIcon(DuplicateIcon);
const ExpandCard = makeCardIcon(ExpandIcon);
const CollapseCard = makeCardIcon(CollapseIcon);

class CardActions extends React.PureComponent {
  render() {
    const {
      className,
      cardIndex,
      size,
      collapsed,
      toggleCard,
      addCopy,
      subtractCopy,
      duplicateCard
    } = this.props;

    return (
      <Base className={className}>
        <IconContainer size={size}>
          <DuplicateCardEntry
            size={size}
            onClick={() => duplicateCard({ cardIndex })}
          />
        </IconContainer>
        <IconContainer size={size}>
          <SubtractOneCardCopy
            size={size}
            onClick={() => subtractCopy({ cardIndex })}
          />
        </IconContainer>
        <IconContainer size={size}>
          <AddOneCardCopy size={size} onClick={() => addCopy({ cardIndex })} />
        </IconContainer>
        <IconContainer size={size}>
          {collapsed ? (
            <ExpandCard size={size} onClick={toggleCard} />
          ) : (
            <CollapseCard size={size} onClick={toggleCard} />
          )}
        </IconContainer>
      </Base>
    );
  }
}

CardActions.propTypes = {
  className: PropTypes.string,
  cardIndex: PropTypes.number,
  collapsed: PropTypes.bool,
  size: PropTypes.number,
  toggleCard: PropTypes.func,
  addCopy: PropTypes.func,
  subtractCopy: PropTypes.func,
  duplicateCard: PropTypes.func
};

CardActions.defaultProps = {
  className: "",
  cardIndex: 0,
  collapsed: false,
  size: 18,
  toggleCard: () => {},
  addCopy: () => {},
  subtractCopy: () => {},
  duplicateCard: () => {}
};

export default CardActions;
