import Promise from "bluebird";

import { BOOT, ready } from "/src/action/app.action";
import { RESTORE_LOGIN } from "/src/action/s3.action";

export default ({ dispatch }) => {
  let appBooted = false;
  let loginRestored = false;

  const dispatchIfReady = () => {
    if (appBooted && loginRestored) {
      dispatch(ready());
    }
  };

  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === BOOT) {
        appBooted = true;
        dispatchIfReady();
      } else if (actionType === RESTORE_LOGIN) {
        loginRestored = true;
        dispatchIfReady();
      }
    });
  };
};
