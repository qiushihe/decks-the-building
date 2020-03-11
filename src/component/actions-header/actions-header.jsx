import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import uuidV4 from "uuid/v4";
import isFunction from "lodash/fp/isFunction";
import isEmpty from "lodash/fp/isEmpty";

import { ThreeDotsIcon } from "/src/component/icon";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
`;

const BaseIconAndLabel = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`;

const BaseIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 auto;
`;

const IconContainer = styled.div`
  display: flex;
`;

const BaseLabel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
`;

const LabelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;

  &::before {
    content: "\\a0";
  }
`;

const LabelTextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LabelText = styled.span`
  position: relative;
  display: inline-block;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: default;
`;

const MenuTrigger = styled.div`
  display: inline-flex;
  border-radius: 9999px;
  color: #000000;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: #6c6d6f;
  }
`;

class ActionsHeader extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.triggerTooltipId = uuidV4();
  }

  renderIcon() {
    const { icon } = this.props;

    if (isFunction(icon)) {
      return icon();
    } else if (icon != null) {
      const IconComponent = icon;
      return (
        <IconContainer>
          <IconComponent />
        </IconContainer>
      );
    } else {
      return null;
    }
  }

  renderLabel() {
    const { label, labelSuffix, menuName, showMenu } = this.props;

    const menuTrigger = isEmpty(menuName) ? null : (
      <MenuTrigger
        data-tooltip-trigger={this.triggerTooltipId}
        onClick={() => showMenu(this.triggerTooltipId)}
      >
        <ThreeDotsIcon size={16} />
      </MenuTrigger>
    );

    if (isFunction(label)) {
      return label({ menuTrigger });
    } else {
      return (
        <LabelContainer>
          <LabelTextContainer>
            <LabelText>{label}</LabelText>
            {isFunction(labelSuffix) ? labelSuffix() : labelSuffix}
            {!isEmpty(menuName) && (
              <React.Fragment>&nbsp;&nbsp;</React.Fragment>
            )}
            {menuTrigger}
          </LabelTextContainer>
        </LabelContainer>
      );
    }
  }

  render() {
    const { className } = this.props;

    const renderedIcon = this.renderIcon();
    const renderedLabel = this.renderLabel();

    return (
      <Base className={className}>
        <BaseIconAndLabel>
          {renderedIcon !== null && <BaseIcon>{renderedIcon}</BaseIcon>}
          {renderedLabel !== null && <BaseLabel>{renderedLabel}</BaseLabel>}
        </BaseIconAndLabel>
      </Base>
    );
  }
}

ActionsHeader.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  labelSuffix: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  menuName: PropTypes.string,
  showMenu: PropTypes.func
};

ActionsHeader.defaultProps = {
  className: "",
  icon: null,
  label: "",
  labelSuffix: "",
  menuName: "",
  showMenu: () => {}
};

export default ActionsHeader;
