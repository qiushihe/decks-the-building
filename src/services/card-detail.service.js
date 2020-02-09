import constant from "lodash/fp/constant";

import { getLocalForgeClient } from "/src/api/localforge.api";
import { getS3Client } from "/src/api/s3.api";
import { getScryfallClient } from "/src/api/scryfall.api";
import { cardName } from "/src/selector/card.selector";
import { withProps } from "/src/util/selector.util";

class CardDetailService {
  constructor() {
    this.localForge = getLocalForgeClient();
    this.s3 = getS3Client();
    this.scryfall = getScryfallClient();
  }

  retrieveDetailByCardId(getState, cardId) {
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
        this.scryfall
          .fetchCardByName(withProps({ cardId })(cardName)(getState()))
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

let CardDetailServiceInstance = null;

export const getCardDetailService = () => {
  if (CardDetailServiceInstance === null) {
    CardDetailServiceInstance = new CardDetailService();
  }
  return CardDetailServiceInstance;
};
