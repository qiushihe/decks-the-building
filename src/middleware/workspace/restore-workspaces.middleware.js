import Promise from "bluebird";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import first from "lodash/fp/first";
import cond from "lodash/fp/cond";
import negate from "lodash/fp/negate";
import isNil from "lodash/fp/isNil";

import { READY } from "/src/action/app.action";
import { activate } from "/src/action/workspace.action";
import { getFetchAllFromLocalService } from "/src/service/workspace/fetch-all-from-local.service";

import importFromJson from "./import-from-json";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === READY) {
      return getFetchAllFromLocalService()
        .retrieveAll()
        .then(flow([map(data => importFromJson(dispatch, data)), Promise.all]))
        .then(
          flow([
            first,
            cond([[negate(isNil), id => dispatch(activate({ id }))]])
          ])
        );
    }
  });
};
