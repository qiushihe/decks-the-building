import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import map from "lodash/fp/map";

import { allCardNames } from "/src/selector/card.selector";
import { encodeCardName } from "/src/util/card.util";

import AddCardsField from "./add-cards-field";

export default connect(
  createStructuredSelector({
    allCardNames
  }),
  null,
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    suggestions: flow([
      get("allCardNames"),
      map(name => ({ id: encodeCardName(name), name }))
    ])(stateProps)
  })
)(AddCardsField);
