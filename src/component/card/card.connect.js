import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { cardName, cardDetailImageUrl } from "/src/selector/card.selector";

import {
  stackCardCountByCardIndex,
  stackCardCollapsedByCardIndex
} from "/src/selector/stack.selector";

import Card from "./card";

export default connect(
  createStructuredSelector({
    collapsed: stackCardCollapsedByCardIndex,
    count: stackCardCountByCardIndex,
    name: cardName,
    imageUrl: cardDetailImageUrl
  })
)(Card);
