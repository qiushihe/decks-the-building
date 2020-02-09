import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

const uncappedReduce = reduce.convert({ cap: false });

export default (state = {}, { ids } = {}) => {
  return {
    ...state,
    allStacks: uncappedReduce(
      (result, stack, id) =>
        includes(id)(ids)
          ? result
          : {
              ...result,
              [id]: stack
            },
      {}
    )(state.allStacks)
  };
};