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
  CollapseIcon,
  AlternateImageIcon
} from "/src/component/icon";

const Base = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background: #000000;
  opacity: 0.65;

  &:hover {
    opacity: 1;
  }

  &:first-child {
    border-bottom-left-radius: 6px;
  }

  &:last-child {
    border-bottom-right-radius: 6px;
  }
`;

const IconButton = styled.div`
  display: flex;
  padding: 3px;
  cursor: pointer;
`;

const IconStyle = css`
  cursor: pointer;
  color: #ffffff;
`;

const makeCardActionIcon = IconComponent => styled(IconComponent).attrs(
  flow([get("size"), multiply(0.6), size => ({ size })])
)`
  ${IconStyle}
`;

const AddOneCardCopy = makeCardActionIcon(AddOneIcon);
const SubtractOneCardCopy = makeCardActionIcon(SubtractOneIcon);
const DuplicateCardEntry = makeCardActionIcon(DuplicateIcon);
const AlternateCardImage = makeCardActionIcon(AlternateImageIcon);
const ExpandCard = makeCardActionIcon(ExpandIcon);
const CollapseCard = makeCardActionIcon(CollapseIcon);

class CardActions extends React.PureComponent {
  render() {
    const {
      className,
      size,
      collapsed,
      hasAlternateImage,
      toggleCard,
      addCopy,
      subtractCopy,
      duplicateCard,
      alternateCardImage
    } = this.props;

    return (
      <Base className={className}>
        {!collapsed && hasAlternateImage && (
          <IconContainer>
            <IconButton size="small" onClick={alternateCardImage}>
              <AlternateCardImage size={size} />
            </IconButton>
          </IconContainer>
        )}
        <IconContainer>
          <IconButton size="small" onClick={duplicateCard}>
            <DuplicateCardEntry size={size} />
          </IconButton>
        </IconContainer>
        <IconContainer>
          <IconButton size="small" onClick={subtractCopy}>
            <SubtractOneCardCopy size={size} />
          </IconButton>
        </IconContainer>
        <IconContainer>
          <IconButton size="small" onClick={addCopy}>
            <AddOneCardCopy size={size} />
          </IconButton>
        </IconContainer>
        <IconContainer>
          <IconButton size="small" onClick={toggleCard}>
            {collapsed ? (
              <ExpandCard size={size} />
            ) : (
              <CollapseCard size={size} />
            )}
          </IconButton>
        </IconContainer>
      </Base>
    );
  }
}

CardActions.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  hasAlternateImage: PropTypes.bool,
  size: PropTypes.number,
  toggleCard: PropTypes.func,
  addCopy: PropTypes.func,
  subtractCopy: PropTypes.func,
  duplicateCard: PropTypes.func,
  alternateCardImage: PropTypes.func
};

CardActions.defaultProps = {
  className: "",
  collapsed: false,
  hasAlternateImage: false,
  size: 18,
  toggleCard: () => {},
  addCopy: () => {},
  subtractCopy: () => {},
  duplicateCard: () => {},
  alternateCardImage: () => {}
};

export default CardActions;
