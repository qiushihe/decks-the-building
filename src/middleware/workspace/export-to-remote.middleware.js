import Promise from "bluebird";
import isNil from "lodash/fp/isNil";

import { EXPORT_WORKSPACE } from "/src/action/s3.action";

export default () => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === EXPORT_WORKSPACE) {
      const {
        payload: { localId, remoteId }
      } = action;

      if (isNil(remoteId)) {
        console.log("EXPORT_WORKSPACE", localId);
      } else {
        console.log("EXPORT_WORKSPACE", localId, " -> ", remoteId);
      }
    }
  });
};
