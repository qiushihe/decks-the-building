import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import {
  RenameIcon,
  CreateIcon,
  DeleteIcon,
  AddCardsIcon,
  CombineCardsIcon
} from "/src/component/icon";

const IconStyle = css`
  margin: 2px;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const makeStackActionIcon = IconComponent => styled(IconComponent).attrs({
  size: 20
})`
  ${IconStyle}
`;

const RenameStack = makeStackActionIcon(RenameIcon);
const AddCardsToStack = makeStackActionIcon(AddCardsIcon);
const DeleteStack = makeStackActionIcon(DeleteIcon);
const CombineCardsInStack = makeStackActionIcon(CombineCardsIcon);
const CreateStack = makeStackActionIcon(CreateIcon);

class StackActions extends React.PureComponent {
  render() {
    const {
      className,
      addCardsToStack,
      combineDuplicateCards,
      renameStack,
      createStack,
      removeStack
    } = this.props;

    return (
      <div className={className}>
        <Tooltip title="Rename Stack">
          <IconButton size="small" onClick={renameStack}>
            <RenameStack />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Cards to Stack">
          <IconButton size="small" onClick={addCardsToStack}>
            <AddCardsToStack />
          </IconButton>
        </Tooltip>
        <Tooltip title="Combine Cards in Stack">
          <IconButton size="small" onClick={combineDuplicateCards}>
            <CombineCardsInStack />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Stack">
          <IconButton size="small" onClick={removeStack}>
            <DeleteStack />
          </IconButton>
        </Tooltip>
        <Tooltip title="Create Stack">
          <IconButton size="small" onClick={createStack}>
            <CreateStack />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

StackActions.propTypes = {
  className: PropTypes.string,
  addCardsToStack: PropTypes.func,
  combineDuplicateCards: PropTypes.func,
  renameStack: PropTypes.func,
  createStack: PropTypes.func,
  removeStack: PropTypes.func
};

StackActions.defaultProps = {
  className: "",
  addCardsToStack: () => {},
  combineDuplicateCards: () => {},
  renameStack: () => {},
  createStack: () => {},
  removeStack: () => {}
};

export default StackActions;
