import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";

import { addItem, removeItem } from "/src/util/array.util";

export default (
  state = {},
  { fromId, toId, fromStackIndex, toStackIndex } = {}
) => {
  if (fromId === toId) {
    const stack = get(`allLanes.${fromId}.stacks.${fromStackIndex}`)(state);
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
            addItem(stack, toStackIndex)
          ])(lane)
        }
      }
    };
  } else {
    const stack = get(`allLanes.${fromId}.stacks.${fromStackIndex}`)(state);
    const fromLane = get(`allLanes.${fromId}`)(state);
    const toLane = get(`allLanes.${toId}`)(state);

    return {
      ...state,
      allLanes: {
        ...state.allLanes,
        [fromId]: {
          ...fromLane,
          stacks: flow([getOr([], "stacks"), removeItem(fromStackIndex)])(
            fromLane
          )
        },
        [toId]: {
          ...toLane,
          stacks: flow([getOr([], "stacks"), addItem(stack, toStackIndex)])(toLane)
        }
      }
    };
  }
};
