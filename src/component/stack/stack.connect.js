import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { moveCard } from "/src/action/stack.action";
import { stackLabel, stackCardIds } from "/src/selector/stack.selector";

import Stack from "./stack";

export default connect(
  createStructuredSelector({
    label: stackLabel,
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
)(Stack);
