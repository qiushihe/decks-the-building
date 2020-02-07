import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { laneStackIds } from "/src/selector/lane.selector";
import { moveStack } from "/src/action/lane.action";

import Stacks from "./stacks";

export default connect(
  createStructuredSelector({
    stackIds: laneStackIds
  }),
  dispatch => ({
    moveStack: ({ fromId, toId, fromStackIndex, toStackIndex }) =>
      dispatch(
        moveStack({
          fromId,
          toId,
          fromStackIndex,
          toStackIndex
        })
      )
  })
)(Stacks);
