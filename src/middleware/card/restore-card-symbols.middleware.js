import Promise from "bluebird";

import { READY } from "/src/action/app.action";
import { restoreCardSymbols } from "/src/action/card.action";
import { getMultiLevelCacheService } from "/src/service/card/multi-level-cache-read.service";
import { CARD_CATALOG_SYMBOLS } from "/src/enum/catalog.enum";

export default ({ dispatch }) => {
  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === READY) {
        const {
          payload: { level }
        } = action;

        if (level === 2) {
          return getMultiLevelCacheService()
            .readCardCatalog(CARD_CATALOG_SYMBOLS)
            .then(symbols => dispatch(restoreCardSymbols({ symbols })));
        }
      }
    });
  };
};
