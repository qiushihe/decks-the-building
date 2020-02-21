import Promise from "bluebird";
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
  CARD_SYMBOLS_CACHE_TIMEOUT,
  CARD_NAMES_CACHE_TIMEOUT,
  CARD_DETAIL_CACHE_TIMEOUT,
  CARD_SYMBOLS_CACHE_VERSION,
  CARD_NAMES_CACHE_VERSION,
  CARD_DETAIL_CACHE_VERSION
} from "/src/config";

import {
  CARD_CATALOG_NAMES,
  CARD_CATALOG_SYMBOLS
} from "/src/enum/catalog.enum";

const CATALOG_TIMEOUTS = {
  [CARD_CATALOG_SYMBOLS]: CARD_SYMBOLS_CACHE_TIMEOUT,
  [CARD_CATALOG_NAMES]: CARD_NAMES_CACHE_TIMEOUT
};

const CATALOG_VERSIONS = {
  [CARD_CATALOG_SYMBOLS]: CARD_SYMBOLS_CACHE_VERSION,
  [CARD_CATALOG_NAMES]: CARD_NAMES_CACHE_VERSION
};

const CATALOG_LOCALFORGE_NAMES = {
  [CARD_CATALOG_SYMBOLS]: "CardSymbols",
  [CARD_CATALOG_NAMES]: "CardNames"
};

const CATALOG_S3_NAMES = {
  [CARD_CATALOG_SYMBOLS]: "card-symbols",
  [CARD_CATALOG_NAMES]: "card-names"
};

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

  readCardCatalog(catalogName) {
    if (
      catalogName !== CARD_CATALOG_NAMES &&
      catalogName !== CARD_CATALOG_SYMBOLS
    ) {
      return Promise.reject(new Error(`unknown catalog: ${catalogName}`));
    }

    const nowTimestamp = new Date().getTime();

    return this.localForge
      .fetchCardCatalog(
        CATALOG_LOCALFORGE_NAMES[catalogName],
        CATALOG_VERSIONS[catalogName]
      )
      .catch(
        logAndRethrowError([
          `readCardCatalog(${catalogName})`,
          "localForge.fetchCardCatalog"
        ])
      )
      .catch(() =>
        this.s3
          .fetchCardCatalog(
            CATALOG_S3_NAMES[catalogName],
            CATALOG_VERSIONS[catalogName]
          )
          .catch(
            logAndRethrowError([
              `readCardCatalog(${catalogName})`,
              "localForge.fetchCardCatalog",
              "s3.fetchCardCatalog"
            ])
          )
          .then(catalogData =>
            this.localForge
              .storeCardCatalog(
                CATALOG_LOCALFORGE_NAMES[catalogName],
                CATALOG_VERSIONS[catalogName],
                catalogData
              )
              .catch(
                logAndRethrowError([
                  `readCardCatalog(${catalogName})`,
                  "localForge.fetchCardCatalog",
                  "s3.fetchCardCatalog",
                  "localForge.storeCardCatalog"
                ])
              )
              .then(constant(catalogData))
          )
      )
      .then(catalogData => {
        const cacheTimestamp = flow([
          get("__dtbCacheTimestamp"),
          value => parseInt(value, 10),
          cond([
            [isNaN, constant(0)],
            [stubTrue, identity]
          ])
        ])(catalogData);

        if (nowTimestamp - cacheTimestamp >= CATALOG_TIMEOUTS[catalogName]) {
          const err = new Error("catalog data has timed out");
          logAndRethrowError([
            `readCardCatalog(${catalogName})`,
            "cache timestamp check"
          ])(err);
          throw err;
        } else {
          return catalogData;
        }
      })
      .catch(() =>
        this.scryfall
          .fetchCardCatalog(catalogName)
          .catch(
            logAndRethrowError([
              `readCardCatalog(${catalogName})`,
              "scryfall.fetchCardCatalog"
            ])
          )
          .then(catalogData => ({
            catalogData,
            __dtbCacheTimestamp: nowTimestamp
          }))
          .then(catalogData =>
            this.s3
              .storeCardCatalog(
                CATALOG_S3_NAMES[catalogName],
                CATALOG_VERSIONS[catalogName],
                catalogData
              )
              .catch(
                logAndRethrowError([
                  `readCardCatalog(${catalogName})`,
                  "s3.storeCardCatalog"
                ])
              )
              .catch(constant(null))
              .finally(() =>
                this.localForge.storeCardCatalog(
                  CATALOG_LOCALFORGE_NAMES[catalogName],
                  CATALOG_VERSIONS[catalogName],
                  catalogData
                )
              )
              .then(constant(catalogData))
          )
      )
      .then(get("catalogData"));
  }

  readCardDetail(cardId, cardName) {
    const nowTimestamp = new Date().getTime();

    return this.localForge
      .fetchCardById(CARD_DETAIL_CACHE_VERSION, cardId)
      .catch(logAndRethrowError(["readCardDetail", "localForge.fetchCardById"]))
      .catch(() =>
        this.s3
          .fetchCardById(CARD_DETAIL_CACHE_VERSION, cardId)
          .catch(logAndRethrowError(["readCardDetail", "s3.fetchCardById"]))
          .then(cardData =>
            this.localForge
              .storeCardById(CARD_DETAIL_CACHE_VERSION, cardId, cardData)
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

        if (nowTimestamp - cacheTimestamp >= CARD_DETAIL_CACHE_TIMEOUT) {
          const err = new Error(
            `card detail cache for ${cardName} has timed out`
          );
          logAndRethrowError(["readCardDetail", "stale check"])(err);
          throw err;
        } else {
          return cardData;
        }
      })
      .catch(() =>
        this.scryfall
          .fetchCardByName(cardName)
          .catch(
            logAndRethrowError(["readCardDetail", "scryfall.fetchCardByName"])
          )
          .then(cardData => ({
            ...cardData,
            __dtbCacheTimestamp: nowTimestamp
          }))
          .then(cardData =>
            this.s3
              .storeCardById(CARD_DETAIL_CACHE_VERSION, cardId, cardData)
              .catch(logAndRethrowError(["readCardDetail", "s3.storeCardById"]))
              .catch(constant(null))
              .finally(() =>
                this.localForge.storeCardById(
                  CARD_DETAIL_CACHE_VERSION,
                  cardId,
                  cardData
                )
              )
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
