import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { stackLabel, stackCardIds } from "/src/selector/stack.selector";

import Stack from "./stack";

export default connect(
  createStructuredSelector({
    label: stackLabel,
    cardIds: stackCardIds
  })
)(Stack);
