import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { stackLabel, stackCardsCount } from "/src/selector/stack.selector";

import StackHeader from "./stack-header";

export default connect(
  createStructuredSelector({
    stackLabel,
    stackCardsCount: stackCardsCount
  })
)(StackHeader);
