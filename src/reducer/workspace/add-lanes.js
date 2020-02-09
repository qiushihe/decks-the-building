import getOr from "lodash/fp/getOr";
import reduce from "lodash/fp/reduce";
import find from "lodash/fp/find";
import flow from "lodash/fp/flow";
import isNil from "lodash/fp/isNil";
import cond from "lodash/fp/cond";
import stubTrue from "lodash/fp/stubTrue";
import constant from "lodash/fp/constant";

export default (state = {}, { id, laneIds } = {}) => {
  return {
    ...state,
    allWorkspaces: {
      ...state.allWorkspaces,
      [id]: {
        ...state.allWorkspaces[id],
        lanes: reduce(
          (result, laneId) =>
            flow([
              find({ id: laneId }),
              cond([
                [isNil, () => [...result, { id: laneId }]],
                [stubTrue, constant(result)]
              ])
            ])(result),
          getOr([], "lanes")(state.allWorkspaces[id])
        )(laneIds)
      }
    }
  };
};
