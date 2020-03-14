import Promise from "bluebird";
import constant from "lodash/fp/constant";

import { READY } from "/src/action/app.action";
import { addFailedCardIds } from "/src/action/card.action";
import { LEVEL_1 } from "/src/enum/app-readiness.enum";
import { APP_READY } from "/src/enum/action-lifecycle.enum";
import { CARD_CATALOG_FETCH_FAILED_IDS } from "/src/enum/catalog.enum";
import { CARD_FETCH_FAILED_IDS_VERSION } from "/src/config";
import { getLocalForgeClient } from "/src/api/localforge.api";
import { contextualMiddleware } from "/src/util/middleware.util";

export default contextualMiddleware(
  { actionLifecycle: APP_READY },
  ({ dispatch }) => {
    return next => action => {
      const { type: actionType } = action;

      return Promise.resolve(next(action)).then(() => {
        if (actionType === READY) {
          const {
            payload: { level }
          } = action;

          if (level === LEVEL_1) {
            return getLocalForgeClient()
              .fetchCatalog(
                CARD_CATALOG_FETCH_FAILED_IDS,
                CARD_FETCH_FAILED_IDS_VERSION
              )
              .catch(constant([]))
              .then(failedCardIds =>
                dispatch(addFailedCardIds({ ids: failedCardIds }))
              );
          }
        }
      });
    };
  }
);
