import Promise from "bluebird";
import isNil from "lodash/fp/isNil";
import uuidV4 from "uuid/v4";

import { IMPORT_WORKSPACE } from "/src/action/s3.action";
import { clear, restoreFromJson, activate } from "/src/action/workspace.action";
import { getFetchFromRemoteService } from "/src/service/workspace/fetch-from-remote.service";

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
            return dispatch(
              restoreFromJson({
                data: {
                  ...workspaceData,
                  id: uuidV4()
                }
              })
            ).then(({ payload: { data: { id } } }) =>
              dispatch(
                activate({
                  id
                })
              )
            );
          } else {
            return dispatch(clear({ id: localId })).then(() =>
              dispatch(
                restoreFromJson({
                  data: {
                    ...workspaceData,
                    id: localId
                  }
                })
              )
            );
          }
        });
    }
  });
};
