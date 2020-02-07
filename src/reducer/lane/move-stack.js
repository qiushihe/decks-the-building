import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import reduce from "lodash/fp/reduce";

import { addItem, removeItem } from "/src/util/array.util";

export default (
  state = {},
  { fromId, toId, fromStackIndex, toStackIndex } = {}
) => {
  if (fromId === toId) {
    return {
      ...state,
      allLanes: flow([
        getOr([], "allLanes"),
        reduce(
          (result, lane) =>
            lane.id === fromId
              ? [
                  ...result,
                  {
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
                ]
              : [...result, lane],
          []
        )
      ])(state)
    };
  } else {
    let stack = null;
    return {
      ...state,
      allLanes: flow([
        getOr([], "allLanes"),
        reduce(
          (result, lane) =>
            lane.id === fromId
              ? [
                  ...result,
                  {
                    ...lane,
                    stacks: flow([
                      getOr([], "stacks"),
                      stacks => {
                        stack = get(fromStackIndex)(stacks);
                        return stacks;
                      },
                      removeItem(fromStackIndex)
                    ])(lane)
                  }
                ]
              : [...result, lane],
          []
        ),
        reduce(
          (result, lane) =>
            lane.id === toId
              ? [
                  ...result,
                  {
                    ...lane,
                    stacks: flow([
                      getOr([], "stacks"),
                      addItem(stack, toStackIndex)
                    ])(lane)
                  }
                ]
              : [...result, lane],
          []
        )
      ])(state)
    };
  }
};
