import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";

import BaseModal from "/src/component/modal/base";

const Base = styled.div`
  max-width: 420px;
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
      <BaseModal
        renderTitle={() => "Workspaces in the Cloud"}
        renderActions={() => (
          <React.Fragment>
            <Button onClick={cancelLogin} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </React.Fragment>
        )}
      >
        <Base>
          <DialogContentText>
            Enter your AWS S3 credential in order to sync workspaces with the
            cloud:
          </DialogContentText>
          <TextField
            label="S3 Credential"
            variant="outlined"
            type="password"
            helperText="Credential format: access-key@secret-key@region@bucket"
            value={loginValue}
            onChange={this.handleChange}
            fullWidth={true}
          />
        </Base>
      </BaseModal>
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
