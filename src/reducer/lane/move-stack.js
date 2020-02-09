import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";

import { addItem, removeItem } from "/src/util/array.util";

export default (
  state = {},
  { fromId, toId, fromStackIndex, toStackIndex } = {}
) => {
  if (fromId === toId) {
    const lane = get(`allLanes.${fromId}`)(state);
    return {
      ...state,
      allLanes: {
        ...state.allLanes,
        [fromId]: {
          ...lane,
          stacks: flow([
            getOr([], "stacks"),
            removeItem(fromStackIndex),
            addItem(
              get(`stacks.${fromStackIndex}`)(lane),
              toStackIndex
            )
          ])(lane)
        }
      }
    };
  } else {
    let stack = null;
    const fromLane = get(`allLanes.${fromId}`)(state);
    const toLane = get(`allLanes.${toId}`)(state);

    return {
      ...state,
      allLanes: {
        ...state.allLanes,
        [fromId]: {
          ...fromLane,
          stacks: flow([
            getOr([], "stacks"),
            stacks => {
              stack = get(fromStackIndex)(stacks);
              return stacks;
            },
            removeItem(fromStackIndex)
          ])(fromLane)
        },
        [toId]: {
          ...toLane,
          stacks: flow([
            getOr([], "stacks"),
            addItem(stack, toStackIndex)
          ])(toLane)
        }
      }
    };
  }
};
