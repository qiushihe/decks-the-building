import Promise from "bluebird";
import uuidV4 from "uuid/v4";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import first from "lodash/fp/first";
import cond from "lodash/fp/cond";
import negate from "lodash/fp/negate";
import isNil from "lodash/fp/isNil";
import isEmpty from "lodash/fp/isEmpty";

import { READY } from "/src/action/app.action";
import { create, activate } from "/src/action/workspace.action";
import { getFetchAllFromLocalService } from "/src/service/workspace/fetch-all-from-local.service";

import importFromJson from "./import-from-json";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === READY) {
      const {
        payload: { level }
      } = action;

      if (level === 3) {
        return getFetchAllFromLocalService()
          .retrieveAll()
          .then(workspacesData => {
            if (isEmpty(workspacesData)) {
              return dispatch(
                create({ id: uuidV4(), label: "Untitled" })
              ).then(({ payload: { id } }) => dispatch(activate({ id })));
            } else {
              const importedFromJson = flow([
                map(data => importFromJson(dispatch, data)),
                Promise.all
              ])(workspacesData);

              return importedFromJson.then(
                flow([
                  first,
                  cond([[negate(isNil), id => dispatch(activate({ id }))]])
                ])
              );
            }
          });
      }
    }
  });
};
