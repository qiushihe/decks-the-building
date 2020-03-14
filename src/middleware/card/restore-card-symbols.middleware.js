import Promise from "bluebird";

import { READY } from "/src/action/app.action";
import { setCardSymbols } from "/src/action/card.action";
import { CARD_CATALOG_SYMBOLS } from "/src/enum/catalog.enum";
import { contextualMiddleware } from "/src/util/middleware.util";
import { getMultiLevelCardCacheService } from "/src/service/card/multi-level-card-cache.service";
import { LEVEL_2 } from "/src/enum/app-readiness.enum";

export default contextualMiddleware({}, ({ dispatch }) => {
  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === READY) {
        const {
          payload: { level }
        } = action;

        if (level === LEVEL_2) {
          return getMultiLevelCardCacheService()
            .readCatalog(CARD_CATALOG_SYMBOLS)
            .then(symbols => dispatch(setCardSymbols({ symbols })));
        }
      }
    });
  };
});
