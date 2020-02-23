import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import omit from "lodash/fp/omit";
import flow from "lodash/fp/flow";
import trim from "lodash/fp/trim";
import split from "lodash/fp/split";
import first from "lodash/fp/first";
import get from "lodash/fp/get";
import map from "lodash/fp/map";

import Tooltip from "@material-ui/core/Tooltip";

import {
  COLOR_IDENTITY_LABEL_GRADIENT_COLOR,
  COLOR_IDENTITY_CARD_GRADIENT_COLOR
} from "/src/enum/color-identity.enum";

import {
  colorIdentityGradientGetter,
  getCardBackground
} from "/src/util/card.util";

import ManaCost from "./mana-cost.connect";

const Base = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #000000;
`;

const Backdrop = styled(props => {
  const componentProps = omit(["colorIdentity"])(props);
  return <div {...componentProps} />;
})`
  display: flex;
  position: absolute;
  top: 0;
  left: 25px;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  border: 2px solid #000000;
  background: linear-gradient(
    225deg,
    ${flow([
      get("colorIdentity"),
      colorIdentityGradientGetter(COLOR_IDENTITY_CARD_GRADIENT_COLOR)
    ])}
  );

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${flow([get("colorIdentity"), getCardBackground])});
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 10px;
    overflow: hidden;
    opacity: 0.5;
  }
`;

const Content = styled(props => {
  const componentProps = omit(["colorIdentity"])(props);
  return <div {...componentProps} />;
})`
  display: flex;
  position: absolute;
  top: 6px;
  left: 5px;
  right: 5px;
  bottom: 6px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 1px 1px 1px 0 #0000003d;
  background: linear-gradient(
    315deg,
    ${flow([
      get("colorIdentity"),
      colorIdentityGradientGetter(COLOR_IDENTITY_LABEL_GRADIENT_COLOR)
    ])}
  );
`;

const CountContainer = styled.div`
  display: flex;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
  text-shadow: 1px 1px 1px #ffffff3d;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 1px;
  width: 25px;
  bottom: 0;
  cursor: default;
`;

const NameContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  margin-left: 8px;
`;

const CardName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex: 1 1 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  span {
    font-family: "Beleren Bold", serif;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-shadow: 0px 1px #ffffffbf;
    cursor: default;
  }
`;

const StyledManaCost = styled(ManaCost)``;

const ManaContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 auto;
  margin-left: 6px;
  margin-right: 6px;

  ${StyledManaCost} {
    margin: 0 1px 0 0;
  }

  ${StyledManaCost}:first-child {
    margin-left: 0;
  }

  ${StyledManaCost}:last-child {
    margin-right: 0;
  }
`;

class CompactImage extends React.PureComponent {
  render() {
    const { className, count, name, manaCost, colorIdentity } = this.props;

    return (
      <Base className={className}>
        <Backdrop colorIdentity={colorIdentity}>
          <Content colorIdentity={colorIdentity}>
            <Tooltip title={name}>
              <NameContainer>
                <CardName>
                  <span>{name}</span>
                </CardName>
              </NameContainer>
            </Tooltip>
            <ManaContainer>
              {flow([
                trim,
                split("//"),
                first,
                trim,
                value => value.match(/({[^{}]+})/gi) || [],
                map(symbol => <StyledManaCost symbol={symbol} />),
                React.Children.toArray
              ])(manaCost)}
            </ManaContainer>
          </Content>
        </Backdrop>
        <CountContainer>{count > 99 ? "99+" : `${count}x`}</CountContainer>
      </Base>
    );
  }
}

CompactImage.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  name: PropTypes.string,
  manaCost: PropTypes.string,
  colorIdentity: PropTypes.arrayOf(PropTypes.string)
};

CompactImage.defaultProps = {
  className: "",
  count: 0,
  name: "",
  manaCost: "",
  colorIdentity: []
};

export default CompactImage;
