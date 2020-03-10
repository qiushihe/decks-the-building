import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import isFunction from "lodash/fp/isFunction";
import isEmpty from "lodash/fp/isEmpty";

import { ThreeDotsIcon } from "/src/component/icon";

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

const ActionsBase = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 27px;
`;

const ActionButton = styled.div`
  display: flex;
  cursor: pointer;
  text-transform: uppercase;
  margin: 0 2px;
  color: #00000096;
  border-radius: 9999px;

  &:hover {
    color: #000000;
  }

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;

  ${ActionsBase} {
    opacity: 0;
  }

  &:hover ${ActionsBase} {
    opacity: 1;
  }
`;

class ActionsHeader extends React.PureComponent {
  renderActions() {
    const { actions } = this.props;

    return (
      <React.Fragment>
        {flow([
          map(({ title, icon: IconComponent, action }) => (
            <ActionButton onClick={action} title={title}>
              <IconComponent size={16} />
            </ActionButton>
          )),
          React.Children.toArray
        ])(actions)}
      </React.Fragment>
    );
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
    const { label, actions } = this.props;

    const menuTrigger = isEmpty(actions) ? null : (
      <MenuTrigger>
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
            {!isEmpty(actions) && <React.Fragment>&nbsp;&nbsp;</React.Fragment>}
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
        <ActionsBase>{this.renderActions()}</ActionsBase>
      </Base>
    );
  }
}

ActionsHeader.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.func]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.elementType,
      action: PropTypes.func
    })
  )
};

ActionsHeader.defaultProps = {
  className: "",
  icon: null,
  label: "",
  actions: []
};

export default ActionsHeader;
