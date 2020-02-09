import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

const uncappedReduce = reduce.convert({ cap: false });

export default (state = {}, { ids } = {}) => {
  return {
    ...state,
    allStacks: uncappedReduce((result, stack, id) => {
      if (includes(id)(ids)) {
        return result;
      } else {
        return {
          ...result,
          [id]: stack
        };
      }
    }, {})(state.allStacks)
  };
};
