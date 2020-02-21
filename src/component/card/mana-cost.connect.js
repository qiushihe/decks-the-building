import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  cardSymbolLabel,
  cardSymbolImageUrl
} from "/src/selector/card.selector";

import ManaCost from "./mana-cost";

export default connect(
  createStructuredSelector({
    label: cardSymbolLabel,
    imageUrl: cardSymbolImageUrl
  })
)(ManaCost);
