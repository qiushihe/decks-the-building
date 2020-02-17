import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { availableWorkspaceLabel } from "/src/selector/s3.selector";

import Option from "./option";

export default connect(
  createStructuredSelector({
    label: availableWorkspaceLabel
  })
)(Option);
