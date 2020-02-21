import Promise from "bluebird";
import { Mutex } from "async-mutex";
import get from "lodash/fp/get";

import { SCRYFALL_API_ORIGIN } from "/src/config";
import { normalizeCardDetail } from "/src/util/scryfall.util";

import {
  CARD_CATALOG_NAMES,
  CARD_CATALOG_SYMBOLS
} from "/src/enum/catalog.enum";

import { get as getRequest } from "./request";

const FETCH_DELAY = 250;

class ScryfallClient {
  constructor() {
    this.fetchedCards = {};
    this.mutex = new Mutex();
  }

  fetchCardCatalog(catalogName) {
    let catalogUrl = null;

    if (catalogName === CARD_CATALOG_NAMES) {
      catalogUrl = `${SCRYFALL_API_ORIGIN}/catalog/card-names`;
    } else if (catalogName === CARD_CATALOG_SYMBOLS) {
      catalogUrl = `${SCRYFALL_API_ORIGIN}/symbology`;
    }

    if (catalogUrl === null) {
      return Promise.reject(new Error(`unknown catalog: ${catalogName}`));
    }

    return this.mutex.acquire().then(release => {
      return getRequest(catalogUrl)
        .then(get("data"))
        .catch(err => {
          throw err;
        })
        .finally(() => {
          setTimeout(() => {
            release();
          }, FETCH_DELAY);
        });
    });
  }

  fetchCardByName(name) {
    return this.mutex.acquire().then(release => {
      const nameParam = encodeURIComponent(name);

      if (!this.fetchedCards[nameParam]) {
        this.fetchedCards[nameParam] = getRequest(
          `${SCRYFALL_API_ORIGIN}/cards/named?exact=${nameParam}`
        )
          .then(res => {
            return normalizeCardDetail(res);
          })
          .catch(err => {
            throw err;
          })
          .finally(() => {
            setTimeout(() => {
              release();
            }, FETCH_DELAY);
          });
      }

      return this.fetchedCards[nameParam];
    });
  }
}

let ScryfallClientInstance = null;

export const getScryfallClient = () => {
  if (ScryfallClientInstance === null) {
    ScryfallClientInstance = new ScryfallClient();
  }
  return ScryfallClientInstance;
};
