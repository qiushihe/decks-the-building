import flow from "lodash/fp/flow";
import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";
import getOr from "lodash/fp/getOr";
import values from "lodash/fp/values";

export default (state = {}, { ids } = {}) => {
  return {
    ...state,
    allStacks: reduce(
      (result, stack) =>
        includes(stack.id)(ids)
          ? {
              ...result,
              [stack.id]: {
                ...stack,
                cards: flow([
                  reduce(
                    (result, { id, count, collapsed }) => ({
                      ...result,
                      [id]: {
                        id,
                        count: getOr(0, `${id}.count`)(result) + count,
                        collapsed:
                          getOr(false, `${id}.collapsed`)(result) || collapsed
                      }
                    }),
                    {}
                  ),
                  values
                ])(stack.cards)
              }
            }
          : {
              ...result,
              [stack.id]: stack
            },
      {}
    )(state.allStacks)
  };
};
