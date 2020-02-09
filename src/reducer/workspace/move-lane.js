import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";

import { addItem, removeItem } from "/src/util/array.util";

export default (state = {}, { id, fromLaneIndex, toLaneIndex } = {}) => {
  return {
    ...state,
    allWorkspaces: {
      ...state.allWorkspaces,
      [id]: {
        ...state.allWorkspaces[id],
        lanes: flow([
          getOr([], "lanes"),
          removeItem(fromLaneIndex),
          addItem(
            get(`lanes.${fromLaneIndex}`)(state.allWorkspaces[id]),
            toLaneIndex
          )
        ])(state.allWorkspaces[id])
      }
    }
  };
};
