import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

const uncappedReduce = reduce.convert({ cap: false });

export default (state = {}, { ids } = {}) => {
  return {
    ...state,
    allLanes: uncappedReduce(
      (result, lane, id) =>
        includes(id)(ids)
          ? result
          : {
              ...result,
              [id]: lane
            },
      {}
    )(state.allLanes)
  };
};
