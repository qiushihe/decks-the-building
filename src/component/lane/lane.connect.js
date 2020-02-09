import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { laneLabel } from "/src/selector/lane.selector";

import Lane from "./lane";

export default connect(
  createStructuredSelector({
    label: laneLabel
  })
)(Lane);
