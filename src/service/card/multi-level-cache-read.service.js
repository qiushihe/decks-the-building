import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import isNaN from "lodash/fp/isNaN";
import stubTrue from "lodash/fp/stubTrue";
import identity from "lodash/fp/identity";
import constant from "lodash/fp/constant";

import { getLocalForgeClient } from "/src/api/localforge.api";
import { getS3Client } from "/src/api/s3.api";
import { getScryfallClient } from "/src/api/scryfall.api";

import {
  CARD_NAMES_CACHE_TIMEOUT,
  CARD_DETAIL_CACHE_TIMEOUT,
  CARD_DETAIL_CACHE_VERSION
} from "/src/config";

class MultiLevelCacheService {
  constructor() {
    this.localForge = getLocalForgeClient();
    this.s3 = getS3Client();
    this.scryfall = getScryfallClient();
  }

  readCardNames() {
    return this.localForge
      .fetchAllCardNames()
      .catch(() =>
        this.s3
          .fetchAllCardNames()
          .then(cardNamesData =>
            this.localForge
              .storeAllCardNames(cardNamesData)
              .then(constant(cardNamesData))
          )
      )
      .then(cardNamesData => {
        const cacheTimestamp = flow([
          get("__dtbCacheTimestamp"),
          value => parseInt(value, 10),
          cond([
            [isNaN, constant(0)],
            [stubTrue, identity]
          ])
        ])(cardNamesData);

        if (new Date().getTime() - cacheTimestamp >= CARD_NAMES_CACHE_TIMEOUT) {
          console.warn(`card names cache has become stale`);
          throw new Error("card names cache stale");
        } else {
          return cardNamesData;
        }
      })
      .catch(() =>
        this.scryfall
          .fetchAllCardNames()
          .then(names => ({
            names,
            __dtbCacheTimestamp: new Date().getTime()
          }))
          .then(cardNamesData =>
            this.s3
              .storeAllCardNames(cardNamesData)
              .catch(constant(null))
              .finally(() => this.localForge.storeAllCardNames(cardNamesData))
              .then(constant(cardNamesData))
          )
      )
      .then(get("names"));
  }

  readCardDetail(cardId, cardName) {
    return this.localForge
      .fetchCardById(cardId)
      .catch(() =>
        this.s3
          .fetchCardById(cardId)
          .then(cardData =>
            this.localForge
              .storeCardById(cardId, cardData)
              .then(constant(cardData))
          )
      )
      .then(cardData => {
        const cacheTimestamp = flow([
          get("__dtbCacheTimestamp"),
          value => parseInt(value, 10),
          cond([
            [isNaN, constant(0)],
            [stubTrue, identity]
          ])
        ])(cardData);

        const cacheVersion = get("__dtbCacheVersion")(cardData);

        if (
          cacheVersion !== CARD_DETAIL_CACHE_VERSION ||
          new Date().getTime() - cacheTimestamp >= CARD_DETAIL_CACHE_TIMEOUT
        ) {
          console.warn(`card detail cache for ${cardName} has become stale`);
          throw new Error("card detail cache stale");
        } else {
          return cardData;
        }
      })
      .catch(() =>
        this.scryfall
          .fetchCardByName(cardName)
          .then(cardData => ({
            ...cardData,
            __dtbCacheVersion: CARD_DETAIL_CACHE_VERSION,
            __dtbCacheTimestamp: new Date().getTime()
          }))
          .then(cardData =>
            this.s3
              .storeCardById(cardId, cardData)
              .catch(constant(null))
              .finally(() => this.localForge.storeCardById(cardId, cardData))
              .then(constant(cardData))
          )
      );
  }
}

let DefaultInstance = null;

export const getMultiLevelCacheService = () => {
  if (DefaultInstance === null) {
    DefaultInstance = new MultiLevelCacheService();
  }
  return DefaultInstance;
};
