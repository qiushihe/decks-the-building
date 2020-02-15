import constant from "lodash/fp/constant";

import { getLocalForgeClient } from "/src/api/localforge.api";
import { getS3Client } from "/src/api/s3.api";
import { getScryfallClient } from "/src/api/scryfall.api";

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
          .then(cardNames =>
            this.localForge
              .storeAllCardNames(cardNames)
              .then(constant(cardNames))
          )
      )
      .catch(() =>
        this.scryfall.fetchAllCardNames().then(cardNames =>
          this.s3
            .storeAllCardNames(cardNames)
            .catch(constant(null))
            .finally(() => this.localForge.storeAllCardNames(cardNames))
            .then(constant(cardNames))
        )
      );
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
      .catch(() =>
        this.scryfall.fetchCardByName(cardName).then(cardData =>
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
