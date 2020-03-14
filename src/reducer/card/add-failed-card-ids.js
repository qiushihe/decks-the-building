import flow from "lodash/fp/flow";
import getOr from "lodash/fp/getOr";
import concat from "lodash/fp/concat";
import uniq from "lodash/fp/uniq";

export default (state = {}, { ids } = {}) => {
  return {
    ...state,
    allFailedCardIds: flow([getOr([], "allFailedCardIds"), concat(ids), uniq])(
      state
    )
  };
};
