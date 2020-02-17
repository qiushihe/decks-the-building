import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  stackCardCountByCardIndex,
  stackCardCollapsedByCardIndex,
  stackCardImageAlternationByCardIndex
} from "/src/selector/stack.selector";

import {
  cardName,
  cardDetailImageUrl,
  cardDetailLayout
} from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";

import Card from "./card";

const withCardImageIndex = withProps({
  imageAlternation: stackCardImageAlternationByCardIndex
});

export default connect(
  createStructuredSelector({
    collapsed: stackCardCollapsedByCardIndex,
    count: stackCardCountByCardIndex,
    name: cardName,
    imageUrl: withCardImageIndex(cardDetailImageUrl),
    layout: cardDetailLayout,
    alternation: stackCardImageAlternationByCardIndex
  })
)(Card);
