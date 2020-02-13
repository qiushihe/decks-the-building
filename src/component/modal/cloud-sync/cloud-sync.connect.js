import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { hasLogin } from "/src/selector/s3.selector";

import CloudSync from "./cloud-sync";

export default connect(
  createStructuredSelector({
    hasLogin
  })
)(CloudSync);
