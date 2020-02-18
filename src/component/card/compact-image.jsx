import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Base = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #000000;
`;

const Backdrop = styled.div`
  display: flex;
  position: absolute;
  top: 3px;
  left: 6px;
  right: 6px;
  bottom: 3px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: inset 0 0 1px 0 #000000;
`;

const Content = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  left: 6px;
  right: 4px;
  bottom: 6px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #e4e4e4;
  box-shadow: 1px 1px 1px 0 #0000004d;
`;

const NameContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  margin-left: 10px;
`;

const CardName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  span {
    font-family: serif;
    font-weight: 700;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-shadow: 0px 1px #ffffffbf;
  }
`;

const ManaContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 0 1 auto;
  margin-right: 6px;
`;

class CompactImage extends React.PureComponent {
  render() {
    const { className, name, manaCost } = this.props;

    return (
      <Base className={className}>
        <Backdrop>
          <Content>
            <NameContainer>
              <CardName>
                <span>{name}</span>
              </CardName>
            </NameContainer>
            <ManaContainer>{manaCost}</ManaContainer>
          </Content>
        </Backdrop>
      </Base>
    );
  }
}

CompactImage.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  manaCost: PropTypes.string
};

CompactImage.defaultProps = {
  className: "",
  name: "",
  manaCost: ""
};

export default CompactImage;
