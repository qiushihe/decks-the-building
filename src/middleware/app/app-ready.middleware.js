import Promise from "bluebird";

import { BOOT, ready } from "/src/action/app.action";

export default ({ dispatch }) => {
  let appBooted = false;

  const dispatchIfReady = () => {
    if (appBooted) {
      dispatch(ready());
    }
  };

  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === BOOT) {
        appBooted = true;
        dispatchIfReady();
      }
    });
  };
};
