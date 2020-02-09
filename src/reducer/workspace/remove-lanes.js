import getOr from "lodash/fp/getOr";
import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

export default (state = {}, { id, laneIds } = {}) => {
  return {
    ...state,
    allWorkspaces: {
      ...state.allWorkspaces,
      [id]: {
        ...state.allWorkspaces[id],
        lanes: reduce(
          (result, lane) =>
            includes(lane.id)(laneIds) ? result : [...result, lane],
          []
        )(getOr([], "lanes")(state.allWorkspaces[id]))
      }
    }
  };
};
