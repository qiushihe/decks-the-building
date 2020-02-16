import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";

import {
  StackIcon,
  RenameIcon,
  CreateIcon,
  DeleteIcon,
  AddCardsIcon,
  CombineCardsIcon,
  DoubleArrowIcon
} from "/src/component/icon";

const Base = styled(Toolbar).attrs({
  variant: "dense",
  disableGutters: true
})`
  padding-left: 6px;
`;

const StyledStackIcon = styled(StackIcon)`
  margin-right: 3px;
`;

const Filler = styled.div`
  flex-grow: 1;
`;

const IconStyle = css`
  margin: 2px;
  cursor: pointer;
  opacity: 0.75;

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

const HideStackMenu = makeStackActionIcon(DoubleArrowIcon);
const ShowStackMenu = styled(makeStackActionIcon(DoubleArrowIcon))`
  transform: rotate(180deg);
`;

class StackHeader extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      menuOpened: false
    };

    this.handleShowMenu = this.handleShowMenu.bind(this);
    this.handleHideMenu = this.handleHideMenu.bind(this);
  }

  handleShowMenu() {
    this.setState({ menuOpened: true });
  }

  handleHideMenu() {
    this.setState({ menuOpened: false });
  }

  renderLabel() {
    const { stackLabel, stackCardsCount } = this.props;

    return (
      <React.Fragment>
        <StyledStackIcon />
        <Typography display="inline" noWrap={true}>
          {stackLabel}
          {stackCardsCount > 0 && ` (${stackCardsCount})`}
        </Typography>
      </React.Fragment>
    );
  }

  renderActions() {
    const {
      addCardsToStack,
      combineDuplicateCards,
      renameStack,
      createStack,
      removeStack
    } = this.props;

    const { menuOpened } = this.state;

    const withHideMenu = actionFn => (...args) => {
      const ret = actionFn(...args);
      this.handleHideMenu();
      return ret;
    };

    return (
      <React.Fragment>
        <Filler />
        {menuOpened && (
          <React.Fragment>
            <Tooltip title="Rename Stack">
              <IconButton size="small" onClick={withHideMenu(renameStack)}>
                <RenameStack />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add Cards to Stack">
              <IconButton size="small" onClick={withHideMenu(addCardsToStack)}>
                <AddCardsToStack />
              </IconButton>
            </Tooltip>
            <Tooltip title="Combine Cards in Stack">
              <IconButton
                size="small"
                onClick={withHideMenu(combineDuplicateCards)}
              >
                <CombineCardsInStack />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Stack">
              <IconButton size="small" onClick={withHideMenu(removeStack)}>
                <DeleteStack />
              </IconButton>
            </Tooltip>
            <Tooltip title="Create Stack">
              <IconButton size="small" onClick={withHideMenu(createStack)}>
                <CreateStack />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        )}
        <Tooltip title={menuOpened ? "Hide Stack Menu" : "Show Stack Menu"}>
          <IconButton
            size="small"
            onClick={menuOpened ? this.handleHideMenu : this.handleShowMenu}
          >
            {menuOpened ? <HideStackMenu /> : <ShowStackMenu />}
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }

  render() {
    const { className } = this.props;
    const { menuOpened } = this.state;

    return (
      <Base className={className}>
        {!menuOpened && this.renderLabel()}
        {this.renderActions()}
      </Base>
    );
  }
}

StackHeader.propTypes = {
  className: PropTypes.string,
  stackLabel: PropTypes.string,
  stackCardsCount: PropTypes.number,
  addCardsToStack: PropTypes.func,
  combineDuplicateCards: PropTypes.func,
  renameStack: PropTypes.func,
  createStack: PropTypes.func,
  removeStack: PropTypes.func
};

StackHeader.defaultProps = {
  className: "",
  stackLabel: "",
  stackCardsCount: 0,
  addCardsToStack: () => {},
  combineDuplicateCards: () => {},
  renameStack: () => {},
  createStack: () => {},
  removeStack: () => {}
};

export default StackHeader;
