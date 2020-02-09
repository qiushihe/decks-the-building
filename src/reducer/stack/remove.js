import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

export default (state = {}, { ids } = {}) => {
  return {
    ...state,
    allStacks: reduce(
      (result, stack) =>
        includes(stack.id)(ids)
          ? result
          : {
              ...result,
              [stack.id]: stack
            },
      {}
    )(state.allStacks)
  };
};
