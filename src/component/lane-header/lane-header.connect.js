import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { laneLabel, laneStackIds } from "/src/selector/lane.selector";
import { stacksCardsCount } from "/src/selector/stack.selector";
import { withProps } from "/src/util/selector.util";

import LaneHeader from "./lane-header";

const withStackIds = withProps({
  stackIds: laneStackIds
});

export default connect(
  createStructuredSelector({
    laneLabel,
    laneCardsCount: withStackIds(stacksCardsCount)
  })
)(LaneHeader);
