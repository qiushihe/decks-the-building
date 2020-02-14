import Promise from "bluebird";
import isNil from "lodash/fp/isNil";
import uuidV4 from "uuid/v4";

import { IMPORT_WORKSPACE } from "/src/action/s3.action";
import { clear, activate } from "/src/action/workspace.action";
import { getFetchFromRemoteService } from "/src/service/workspace/fetch-from-remote.service";

import importFromJson from "./import-from-json";

export default ({ dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === IMPORT_WORKSPACE) {
      const {
        payload: { remoteId, localId }
      } = action;

      return getFetchFromRemoteService()
        .fetch(remoteId)
        .then(workspaceData => {
          if (isNil(localId)) {
            return importFromJson(dispatch, {
              ...workspaceData,
              id: uuidV4()
            }).then(({ payload: { data: { id } } }) =>
              dispatch(
                activate({
                  id
                })
              )
            );
          } else {
            return dispatch(clear({ id: localId })).then(() =>
              importFromJson(dispatch, {
                ...workspaceData,
                id: localId
              })
            );
          }
        });
    }
  });
};
