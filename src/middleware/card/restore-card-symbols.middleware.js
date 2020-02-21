import Promise from "bluebird";

import { BOOT } from "/src/action/app.action";
import { restoreCardSymbols } from "/src/action/card.action";
import { getMultiLevelCacheService } from "/src/service/card/multi-level-cache-read.service";
import { CARD_CATALOG_SYMBOLS } from "/src/enum/catalog.enum";

export default ({ dispatch }) => {
  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === BOOT) {
        return getMultiLevelCacheService()
          .readCardCatalog(CARD_CATALOG_SYMBOLS)
          .then(symbols => dispatch(restoreCardSymbols({ symbols })));
      }
    });
  };
};
