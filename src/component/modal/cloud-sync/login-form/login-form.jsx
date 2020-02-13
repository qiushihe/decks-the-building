import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Arrange from "/src/component/arrange";

const Base = styled.div``;

const S3LoginInput = styled.input.attrs({
  type: "password",
  placeholder: "access-key@secret-key@region@bucket"
})`
  width: 250px;

  &::placeholder {
    font-size: 12px;
  }
`;

export class LoginForm extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      loginValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      loginValue: evt.target.value
    });
  }

  handleSubmit() {
    const { submitLogin } = this.props;
    const { loginValue } = this.state;

    submitLogin({ login: loginValue });
  }

  render() {
    const { cancelLogin } = this.props;
    const { loginValue } = this.state;

    return (
      <Base>
        <div>S3 Login:</div>
        <S3LoginInput value={loginValue} onChange={this.handleChange} />
        <Arrange>
          <Arrange.Fill>&nbsp;</Arrange.Fill>
          <Arrange.Fit>
            <button onClick={cancelLogin}>Cancel</button>
          </Arrange.Fit>
          <Arrange.Fit>&nbsp;&nbsp;</Arrange.Fit>
          <Arrange.Fit>
            <button onClick={this.handleSubmit}>Submit</button>
          </Arrange.Fit>
        </Arrange>
      </Base>
    );
  }
}

LoginForm.propTypes = {
  submitLogin: PropTypes.func,
  cancelLogin: PropTypes.func
};

LoginForm.defaultProps = {
  submitLogin: () => {},
  cancelLogin: () => {}
};

export default LoginForm;
