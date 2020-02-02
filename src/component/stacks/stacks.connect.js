import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { allStackIdsByLaneId } from "/src/selector/stack.selector";

import Stacks from "./stacks";

export default connect(
  createStructuredSelector({
    stackIds: allStackIdsByLaneId
  })
)(Stacks);
