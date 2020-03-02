import Promise from "bluebird";

import { READY } from "/src/action/app.action";
import { setCardNames } from "/src/action/card.action";
import { getMultiLevelCacheService } from "/src/service/card/multi-level-cache-read.service";
import { CARD_CATALOG_NAMES } from "/src/enum/catalog.enum";
import { contextualMiddleware } from "/src/util/middleware.util";

export default contextualMiddleware({}, ({ dispatch }) => {
  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === READY) {
        const {
          payload: { level }
        } = action;

        if (level === 2) {
          return getMultiLevelCacheService()
            .readCardCatalog(CARD_CATALOG_NAMES)
            .then(names => dispatch(setCardNames({ names })));
        }
      }
    });
  };
});
