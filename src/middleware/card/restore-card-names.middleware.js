import Promise from "bluebird";

import { BOOT } from "/src/action/app.action";
import { restoreCardNames } from "/src/action/card.action";
import { getMultiLevelCacheService } from "/src/service/card/multi-level-cache-read.service";

export default ({ dispatch }) => {
  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === BOOT) {
        return getMultiLevelCacheService()
          .readCardNames()
          .then(names => dispatch(restoreCardNames({ names })));
      }
    });
  };
};
