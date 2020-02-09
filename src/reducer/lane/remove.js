import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

export default (state = {}, { ids } = {}) => {
  return {
    ...state,
    allLanes: reduce(
      (result, lane) =>
        includes(lane.id)(ids)
          ? result
          : {
              ...result,
              [lane.id]: lane
            },
      {}
    )(state.allLanes)
  };
};
