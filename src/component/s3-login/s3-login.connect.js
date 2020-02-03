import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { updateLogin } from "/src/action/s3.action";
import { login } from "/src/selector/s3.selector";

import S3Login from "./s3-login";

export default connect(
  createStructuredSelector({
    value: login
  }),
  dispatch => ({
    updateLogin: ({ login }) => dispatch(updateLogin({ login }))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onChange: evt => {
      dispatchProps.updateLogin({
        login: evt.target.value
      });
    }
  })
)(S3Login);
