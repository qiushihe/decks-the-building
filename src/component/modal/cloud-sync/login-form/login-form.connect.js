import { connect } from "react-redux";

import { setLogin } from "/src/action/s3.action";

import LoginForm from "./login-form";

export default connect(null, dispatch => ({
  submitLogin: ({ login }) => dispatch(setLogin({ login }))
}))(LoginForm);
