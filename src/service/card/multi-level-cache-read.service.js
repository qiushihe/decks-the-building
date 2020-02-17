import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import cond from "lodash/fp/cond";
import isNaN from "lodash/fp/isNaN";
import stubTrue from "lodash/fp/stubTrue";
import identity from "lodash/fp/identity";
import constant from "lodash/fp/constant";
import join from "lodash/fp/join";

import { getLocalForgeClient } from "/src/api/localforge.api";
import { getS3Client } from "/src/api/s3.api";
import { getScryfallClient } from "/src/api/scryfall.api";

import {
  CARD_NAMES_CACHE_TIMEOUT,
  CARD_DETAIL_CACHE_TIMEOUT,
  CARD_DETAIL_CACHE_VERSION
} from "/src/config";

const logAndRethrowError = prefix => err => {
  console.warn(join(" > ")(prefix), err);
  throw err;
};

class MultiLevelCacheService {
  constructor() {
    this.localForge = getLocalForgeClient();
    this.s3 = getS3Client();
    this.scryfall = getScryfallClient();
  }

  readCardNames() {
    const nowTimestamp = new Date().getTime();

    return this.localForge
      .fetchAllCardNames()
      .catch(
        logAndRethrowError(["readCardNames", "localForge.fetchAllCardNames"])
      )
      .catch(() =>
        this.s3
          .fetchAllCardNames()
          .catch(
            logAndRethrowError([
              "readCardNames",
              "localForge.fetchAllCardNames",
              "s3.fetchAllCardNames"
            ])
          )
          .then(cardNamesData =>
            this.localForge
              .storeAllCardNames(cardNamesData)
              .catch(
                logAndRethrowError([
                  "readCardNames",
                  "localForge.fetchAllCardNames",
                  "s3.fetchAllCardNames",
                  "localForge.storeAllCardNames"
                ])
              )
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

        if (nowTimestamp - cacheTimestamp >= CARD_NAMES_CACHE_TIMEOUT) {
          throw new Error("card names cache has timed out");
        } else {
          return cardNamesData;
        }
      })
      .catch(logAndRethrowError(["readCardNames", "stale check"]))
      .catch(() =>
        this.scryfall
          .fetchAllCardNames()
          .catch(
            logAndRethrowError(["readCardNames", "scryfall.fetchAllCardNames"])
          )
          .then(names => ({
            names,
            __dtbCacheTimestamp: nowTimestamp
          }))
          .then(cardNamesData =>
            this.s3
              .storeAllCardNames(cardNamesData)
              .catch(
                logAndRethrowError(["readCardNames", "s3.storeAllCardNames"])
              )
              .catch(constant(null))
              .finally(() => this.localForge.storeAllCardNames(cardNamesData))
              .then(constant(cardNamesData))
          )
      )
      .then(get("names"));
  }

  readCardDetail(cardId, cardName) {
    const nowTimestamp = new Date().getTime();

    return this.localForge
      .fetchCardById(cardId)
      .catch(logAndRethrowError(["readCardDetail", "localForge.fetchCardById"]))
      .catch(() =>
        this.s3
          .fetchCardById(cardId)
          .catch(logAndRethrowError(["readCardDetail", "s3.fetchCardById"]))
          .then(cardData =>
            this.localForge
              .storeCardById(cardId, cardData)
              .catch(
                logAndRethrowError([
                  "readCardDetail",
                  "localForge.storeCardById"
                ])
              )
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

        if (cacheVersion !== CARD_DETAIL_CACHE_VERSION) {
          throw new Error(`card detail cache for ${cardName} is out of date`);
        } else if (nowTimestamp - cacheTimestamp >= CARD_DETAIL_CACHE_TIMEOUT) {
          throw new Error(`card detail cache for ${cardName} has timed out`);
        } else {
          return cardData;
        }
      })
      .catch(logAndRethrowError(["readCardDetail", "stale check"]))
      .catch(() =>
        this.scryfall
          .fetchCardByName(cardName)
          .catch(
            logAndRethrowError(["readCardDetail", "scryfall.fetchCardByName"])
          )
          .then(cardData => ({
            ...cardData,
            __dtbCacheVersion: CARD_DETAIL_CACHE_VERSION,
            __dtbCacheTimestamp: nowTimestamp
          }))
          .then(cardData =>
            this.s3
              .storeCardById(cardId, cardData)
              .catch(logAndRethrowError(["readCardDetail", "s3.storeCardById"]))
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
