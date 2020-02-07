import flow from "lodash/fp/flow";
import get from "lodash/fp/get";

import { addItem, removeItem } from "/src/util/array.util";

export default (state = {}, { fromIndex, toIndex } = {}) => {
  const lane = get(`allLanes.${fromIndex}`)(state);

  return {
    ...state,
    allLanes: flow([removeItem(fromIndex), addItem(lane, toIndex)])(
      state.allLanes
    )
  };
};
