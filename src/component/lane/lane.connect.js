import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { landLabel } from "/src/selector/lane.selector";

import Lane from "./lane";

export default connect(
  createStructuredSelector({
    label: landLabel
  })
)(Lane);
