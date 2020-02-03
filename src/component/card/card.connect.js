import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { cardName, cardDetailImageUrl } from "/src/selector/card.selector";
import { stackCardCountByCardId } from "/src/selector/stack.selector";

import Card from "./card";

export default connect(
  createStructuredSelector({
    count: stackCardCountByCardId,
    name: cardName,
    imageUrl: cardDetailImageUrl
  })
)(Card);
