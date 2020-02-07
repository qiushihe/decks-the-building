import getOr from "lodash/fp/getOr";
import reduce from "lodash/fp/reduce";
import find from "lodash/fp/find";
import flow from "lodash/fp/flow";
import isNil from "lodash/fp/isNil";
import cond from "lodash/fp/cond";
import stubTrue from "lodash/fp/stubTrue";
import constant from "lodash/fp/constant";

export default (state = {}, { id, stackIds } = {}) => {
  return {
    ...state,
    allLanes: flow([
      getOr([], "allLanes"),
      reduce(
        (result, lane) =>
          lane.id === id
            ? [
                ...result,
                {
                  ...lane,
                  stacks: reduce(
                    (result, stackId) =>
                      flow([
                        find({ id: stackId }),
                        cond([
                          [isNil, () => [...result, { id: stackId }]],
                          [stubTrue, constant(result)]
                        ])
                      ])(result),
                    getOr([], "stacks")(lane)
                  )(stackIds)
                }
              ]
            : [...result, lane],
        []
      )
    ])(state)
  };
};
