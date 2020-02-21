import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { stackCardCollapsedByCardIndex } from "/src/selector/stack.selector";

import Card from "./card";

export default connect(
  createStructuredSelector({
    collapsed: stackCardCollapsedByCardIndex
  })
)(Card);
