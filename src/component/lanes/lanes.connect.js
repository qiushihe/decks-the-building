import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { allLaneIds } from "/src/selector/lane.selector";

import Lanes from "./lanes";

export default connect(
  createStructuredSelector({
    laneIds: allLaneIds
  })
)(Lanes);
