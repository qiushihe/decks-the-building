import getOr from "lodash/fp/getOr";
import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

export default (state = {}, { id, stackIds } = {}) => {
  return {
    ...state,
    allLanes: {
      ...state.allLanes,
      [id]: {
        ...state.allLanes[id],
        stacks: reduce(
          (result, stack) =>
            includes(stack.id)(stackIds) ? result : [...result, stack],
          []
        )(getOr([], "stacks")(state.allLanes[id]))
      }
    }
  };
};
