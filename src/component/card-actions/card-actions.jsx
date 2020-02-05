import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Maximize2, Minimize2, Plus, Minus, Copy } from "react-feather";
import get from "lodash/fp/get";

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

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const IconStyle = css`
  width: 65%;
  height: 65%;
  cursor: pointer;
  color: #ffffff;
`;

const AddCopyIcon = styled(Plus)`${IconStyle}`;
const RemoveCopyIcon = styled(Minus)`${IconStyle}`;
const SplitCopyIcon = styled(Copy)`${IconStyle}`;
const ExpandIcon = styled(Maximize2)`${IconStyle}`;
const CollapseIcon = styled(Minimize2)`${IconStyle}`;

class CardActions extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    const { onToggleClicked } = this.props;
    onToggleClicked();
  }

  render() {
    const { className, size, collapsed, count } = this.props;
    return (
      <Base className={className}>
        {count > 1 && (
          <IconContainer size={size}>
            <SplitCopyIcon />
          </IconContainer>
        )}
        <IconContainer size={size}>
          <RemoveCopyIcon />
        </IconContainer>
        <IconContainer size={size}>
          <AddCopyIcon />
        </IconContainer>
        <IconContainer size={size}>
          {collapsed ? (
            <ExpandIcon onClick={this.handleToggleClick} />
          ) : (
            <CollapseIcon onClick={this.handleToggleClick} />
          )}
        </IconContainer>
      </Base>
    );
  }
}

CardActions.propTypes = {
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  count: PropTypes.number,
  size: PropTypes.number,
  onToggleClicked: PropTypes.func
};

CardActions.defaultProps = {
  className: "",
  collapsed: false,
  count: 0,
  size: 16,
  onToggleClicked: () => {}
};

export default CardActions;
