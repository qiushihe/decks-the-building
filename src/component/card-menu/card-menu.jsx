import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Menu, Maximize2, Minimize2 } from "react-feather";
import get from "lodash/fp/get";

const Base = styled.div`
  display: flex;
  flex-direction: row;
`;

const IconContainer = styled.div`
  display: flex;
  background: #808080;
  border-radius: 100%;
  padding: 2px;
  margin: 0 1px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const IconStyle = css`
  width: ${get("size")}px;
  height: ${get("size")}px;
  cursor: pointer;
  color: #ffffff;
`;

const MenuIcon = styled(Menu)`
  ${IconStyle};
`;

const ExpandIcon = styled(Maximize2)`
  ${IconStyle};
`;

const CollapseIcon = styled(Minimize2)`
  ${IconStyle};
`;

class CardMenu extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    const { onToggleClicked } = this.props;
    onToggleClicked();
  }

  render() {
    const { className, size, collapsed } = this.props;
    return (
      <Base className={className}>
        <IconContainer>
          <MenuIcon size={size} />
        </IconContainer>
        <IconContainer>
          {collapsed ? (
            <ExpandIcon size={size} onClick={this.handleToggleClick} />
          ) : (
            <CollapseIcon size={size} onClick={this.handleToggleClick} />
          )}
        </IconContainer>
      </Base>
    );
  }
}

CardMenu.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  size: PropTypes.number,
  onToggleClicked: PropTypes.func
};

CardMenu.defaultProps = {
  className: "",
  collapsed: false,
  size: 16,
  onToggleClicked: () => {}
};

export default CardMenu;
