import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { stackCardIds } from "/src/selector/stack.selector";
import { moveCard } from "/src/action/stack.action";

import Cards from "./cards";

export default connect(
  createStructuredSelector({
    cardIds: stackCardIds
  }),
  dispatch => ({
    moveCard: ({ fromId, toId, fromCardIndex, toCardIndex }) =>
      dispatch(
        moveCard({
          fromId,
          toId,
          fromCardIndex,
          toCardIndex
        })
      )
  })
)(Cards);
