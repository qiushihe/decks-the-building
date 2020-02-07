import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { allLaneIds } from "/src/selector/lane.selector";
import { move } from "/src/action/lane.action";

import Lanes from "./lanes";

export default connect(
  createStructuredSelector({
    laneIds: allLaneIds
  }),
  dispatch => ({
    move: ({ fromIndex, toIndex }) =>
      dispatch(
        move({
          fromIndex,
          toIndex
        })
      )
  })
)(Lanes);
