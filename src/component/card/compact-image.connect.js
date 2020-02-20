import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { stackCardCountByCardIndex } from "/src/selector/stack.selector";
import { cardName, cardDetailManaCost } from "/src/selector/card.selector";

import CompactImage from "./compact-image";

export default connect(
  createStructuredSelector({
    count: stackCardCountByCardIndex,
    name: cardName,
    manaCost: cardDetailManaCost
  })
)(CompactImage);
