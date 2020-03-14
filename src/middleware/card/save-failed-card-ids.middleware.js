import Promise from "bluebird";
import flow from "lodash/fp/flow";
import concat from "lodash/fp/concat";
import compact from "lodash/fp/compact";
import uniq from "lodash/fp/uniq";

import { ADD_FAILED_CARD_IDS } from "/src/action/card.action";
import { APP_READY } from "/src/enum/action-lifecycle.enum";
import { CARD_CATALOG_FETCH_FAILED_IDS } from "/src/enum/catalog.enum";
import { CARD_FETCH_FAILED_IDS_VERSION } from "/src/config";
import { allFailedCardIds } from "/src/selector/card.selector";
import { getLocalForgeClient } from "/src/api/localforge.api";
import { contextualMiddleware } from "/src/util/middleware.util";

export default contextualMiddleware({}, ({ getState }) => {
  return next => action => {
    const { type: actionType } = action;

    return Promise.resolve(next(action)).then(() => {
      if (actionType === ADD_FAILED_CARD_IDS) {
        const {
          payload: { ids },
          context: { actionLifecycle } = {}
        } = action;

        if (actionLifecycle !== APP_READY) {
          const failedCardIds = flow([
            allFailedCardIds,
            concat(ids),
            compact,
            uniq
          ])(getState());

          return getLocalForgeClient().storeCatalog(
            CARD_CATALOG_FETCH_FAILED_IDS,
            CARD_FETCH_FAILED_IDS_VERSION,
            failedCardIds
          );
        }
      }
    });
  };
});
