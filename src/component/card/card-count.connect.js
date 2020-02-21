import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { stackCardCountByCardIndex } from "/src/selector/stack.selector";

import CardCount from "./card-count";

export default connect(
  createStructuredSelector({
    count: stackCardCountByCardIndex
  })
)(CardCount);
