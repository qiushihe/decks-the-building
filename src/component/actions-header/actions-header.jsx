import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import isFunction from "lodash/fp/isFunction";

import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import { DoubleArrowIcon } from "/src/component/icon";

const Base = styled(Toolbar).attrs({
  variant: "dense",
  disableGutters: true
})``;

const LabelBase = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 auto;
`;

const ActionsBase = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const IconStyle = css`
  margin: 2px;
  cursor: pointer;
  opacity: 0.75;

  &:hover {
    opacity: 1;
  }
`;

const makeActionIcon = IconComponent => styled(IconComponent).attrs({
  size: 20
})`
  ${IconStyle}
`;

const HideStackMenu = makeActionIcon(DoubleArrowIcon);
const ShowStackMenu = styled(makeActionIcon(DoubleArrowIcon))`
  transform: rotate(180deg);
`;

class ActionsHeader extends React.PureComponent {
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

  renderActions() {
    const { actions } = this.props;
    const { menuOpened } = this.state;

    const withHideMenu = actionFn => (...args) => {
      const ret = actionFn(...args);
      this.handleHideMenu();
      return ret;
    };

    return (
      <ActionsBase>
        {menuOpened && (
          <React.Fragment>
            {flow([
              map(({ title, icon: IconComponent, action }) => (
                <Tooltip title={title}>
                  <IconButton size="small" onClick={withHideMenu(action)}>
                    <IconComponent />
                  </IconButton>
                </Tooltip>
              )),
              React.Children.toArray
            ])(actions)}
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
      </ActionsBase>
    );
  }

  render() {
    const { className, renderLabel, disableLabelAutoHide } = this.props;
    const { menuOpened } = this.state;

    const shouldRenderLabel =
      (!menuOpened || disableLabelAutoHide) && isFunction(renderLabel);

    return (
      <Base className={className}>
        <LabelBase>
          {shouldRenderLabel ? (
            renderLabel()
          ) : (
            <React.Fragment>&nbsp;</React.Fragment>
          )}
        </LabelBase>
        {this.renderActions()}
      </Base>
    );
  }
}

ActionsHeader.propTypes = {
  className: PropTypes.string,
  renderLabel: PropTypes.func,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.elementType,
      action: PropTypes.func
    })
  ),
  disableLabelAutoHide: PropTypes.bool
};

ActionsHeader.defaultProps = {
  className: "",
  renderLabel: null,
  actions: [],
  disableLabelAutoHide: false
};

export default ActionsHeader;
