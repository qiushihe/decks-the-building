import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 250px;

  &::placeholder {
    font-size: 12px;
  }
`;

class S3Login extends React.PureComponent {
  render() {
    const { value, onChange } = this.props;
    return (
      <div>
        S3 Login: &nbsp;
        <StyledInput
          type="password"
          placeholder="access-key@secret-key@region@bucket"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

S3Login.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

S3Login.defaultProps = {
  value: "",
  onChange: () => {}
};

export default S3Login;
