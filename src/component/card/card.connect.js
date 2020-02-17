import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  stackCardCountByCardIndex,
  stackCardCollapsedByCardIndex,
  stackCardImageIndexByCardIndex
} from "/src/selector/stack.selector";

import { cardName, cardDetailImageUrl } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";

import Card from "./card";

const withCardImageIndex = withProps({
  imageIndex: stackCardImageIndexByCardIndex
});

export default connect(
  createStructuredSelector({
    collapsed: stackCardCollapsedByCardIndex,
    count: stackCardCountByCardIndex,
    name: cardName,
    imageUrl: withCardImageIndex(cardDetailImageUrl)
  })
)(Card);
