import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import isNil from "lodash/fp/isNil";
import isFunction from "lodash/fp/isFunction";

const Base = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  flex: 0 1 auto;
`;

const LabelContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  align-self: normal;
`;

const LabelText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px;
  }
`;

class Label extends React.PureComponent {
  render() {
    const { className, icon: IconComponent, label } = this.props;

    return (
      <Base className={className}>
        {!isNil(IconComponent) && (
          <IconContainer>
            <IconComponent />
          </IconContainer>
        )}
        <LabelContainer>
          {isFunction(label) ? (
            label()
          ) : (
            <LabelText>
              <span>{label}</span>
            </LabelText>
          )}
        </LabelContainer>
      </Base>
    );
  }
}

Label.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};

Label.defaultProps = {
  className: "",
  icon: null,
  label: ""
};

export default Label;
