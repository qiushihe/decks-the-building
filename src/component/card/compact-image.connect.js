import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { cardName, cardDetailManaCost } from "/src/selector/card.selector";

import CompactImage from "./compact-image";

export default connect(
  createStructuredSelector({
    name: cardName,
    manaCost: cardDetailManaCost
  })
)(CompactImage);
