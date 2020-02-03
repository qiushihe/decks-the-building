import { Mutex } from "async-mutex";

import { SCRYFALL_API_ORIGIN } from "/src/config";
import { normalizeCardDetail } from "/src/util/scryfall.util";
import { update } from "/src/action/card.action";

import { get as getRequest } from "./request";

const FETCH_DELAY = 1000;

class Queue {
  constructor({ dispatch }) {
    this.dispatch = dispatch;
    this.fetchedCards = {};
    this.mutex = new Mutex();
  }

  fetch({ cardId, name }) {
    return this.mutex.acquire().then(release => {
      const nameParam = encodeURIComponent(name);

      if (!this.fetchedCards[nameParam]) {
        this.fetchedCards[nameParam] = getRequest(
          `${SCRYFALL_API_ORIGIN}/cards/named?exact=${nameParam}`
        )
          .then(res => {
            return this.dispatch(
              update({
                id: cardId,
                ...normalizeCardDetail(res)
              })
            );
          })
          .catch(err => {
            console.error(err);
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

export const DEFAULT_FETCH_CARD_QUEUE_NAME = "DEFAULT";

const fetchCardQueues = {};

export const getFetchCardQueue = ({
  dispatch,
  queueName = DEFAULT_FETCH_CARD_QUEUE_NAME
} = {}) => {
  if (!fetchCardQueues[queueName]) {
    fetchCardQueues[queueName] = new Queue({ dispatch });
  }
  return fetchCardQueues[queueName];
};
