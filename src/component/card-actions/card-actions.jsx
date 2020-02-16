import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import multiply from "lodash/fp/multiply";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

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

const makeCardActionIcon = IconComponent => styled(IconComponent).attrs(
  flow([get("size"), multiply(0.75), size => ({ size })])
)`
  ${IconStyle}
`;

const AddOneCardCopy = makeCardActionIcon(AddOneIcon);
const SubtractOneCardCopy = makeCardActionIcon(SubtractOneIcon);
const DuplicateCardEntry = makeCardActionIcon(DuplicateIcon);
const ExpandCard = makeCardActionIcon(ExpandIcon);
const CollapseCard = makeCardActionIcon(CollapseIcon);

class CardActions extends React.PureComponent {
  render() {
    const {
      className,
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
          <Tooltip title="Duplicate Card Entry">
            <IconButton size="small" onClick={duplicateCard}>
              <DuplicateCardEntry size={size} />
            </IconButton>
          </Tooltip>
        </IconContainer>
        <IconContainer size={size}>
          <Tooltip title="Subtract Card Copy">
            <IconButton size="small" onClick={subtractCopy}>
              <SubtractOneCardCopy size={size} />
            </IconButton>
          </Tooltip>
        </IconContainer>
        <IconContainer size={size}>
          <Tooltip title="Add Card Copy">
            <IconButton size="small" onClick={addCopy}>
              <AddOneCardCopy size={size} />
            </IconButton>
          </Tooltip>
        </IconContainer>
        <IconContainer size={size}>
          <Tooltip title={collapsed ? "Expand Card" : "Collapse Card"}>
            {collapsed ? (
              <IconButton size="small" onClick={toggleCard}>
                <ExpandCard size={size} />
              </IconButton>
            ) : (
              <IconButton size="small" onClick={toggleCard}>
                <CollapseCard size={size} />
              </IconButton>
            )}
          </Tooltip>
        </IconContainer>
      </Base>
    );
  }
}

CardActions.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  size: PropTypes.number,
  toggleCard: PropTypes.func,
  addCopy: PropTypes.func,
  subtractCopy: PropTypes.func,
  duplicateCard: PropTypes.func
};

CardActions.defaultProps = {
  className: "",
  collapsed: false,
  size: 18,
  toggleCard: () => {},
  addCopy: () => {},
  subtractCopy: () => {},
  duplicateCard: () => {}
};

export default CardActions;
