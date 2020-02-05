import { Mutex } from "async-mutex";

import { SCRYFALL_API_ORIGIN } from "/src/config";
import { normalizeCardDetail } from "/src/util/scryfall.util";

import { get as getRequest } from "./request";

const FETCH_DELAY = 1000;

class ScryfallClient {
  constructor() {
    this.fetchedCards = {};
    this.mutex = new Mutex();
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
