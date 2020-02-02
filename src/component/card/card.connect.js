import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { cardName } from "/src/selector/card.selector";

import Card from "./card";

export default connect(
  createStructuredSelector({
    name: cardName
  })
)(Card);
