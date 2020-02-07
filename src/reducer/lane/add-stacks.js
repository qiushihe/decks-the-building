import getOr from "lodash/fp/getOr";
import reduce from "lodash/fp/reduce";
import find from "lodash/fp/find";
import flow from "lodash/fp/flow";
import isNil from "lodash/fp/isNil";
import cond from "lodash/fp/cond";
import stubTrue from "lodash/fp/stubTrue";
import constant from "lodash/fp/constant";

export default (state = {}, { id, stackIds } = {}) => {
  const stateStacks = getOr([], `allLanes.${id}.stacks`)(state);

  return {
    ...state,
    allLanes: {
      ...state.allLanes,
      [id]: {
        ...state.allLanes[id],
        stacks: reduce(
          (existingStacks, stackId) =>
            flow([
              find({ id: stackId }),
              cond([
                [isNil, () => [...existingStacks, { id: stackId }]],
                [stubTrue, constant(existingStacks)]
              ])
            ])(existingStacks),
          stateStacks
        )(stackIds)
      }
    }
  };
};
