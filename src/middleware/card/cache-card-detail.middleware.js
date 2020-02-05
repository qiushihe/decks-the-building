import Promise from "bluebird";

import {
  RESTORE_FROM_SCRYFALL,
  RESTORE_FROM_S3
} from "/src/action/card.action";

import { withProps } from "/src/util/selector.util";
import { getLocalForgeClient } from "/src/api/localforge.api";

import {
  cardName,
  cardDetailManaCost,
  cardDetailConvertedManaCost,
  cardDetailTypeLine,
  cardDetailOracleText,
  cardDetailFlavorText,
  cardDetailImageUrl
} from "/src/selector/card.selector";

export default ({ getState }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (
      actionType === RESTORE_FROM_SCRYFALL ||
      actionType === RESTORE_FROM_S3
    ) {
      const newState = getState();

      const {
        payload: { id: cardId }
      } = action;

      const withCardId = withProps({ cardId });
      const localForgeClient = getLocalForgeClient();

      return localForgeClient.storeCardById(cardId, {
        name: withCardId(cardName)(newState),
        manaCost: withCardId(cardDetailManaCost)(newState),
        convertedManaCost: withCardId(cardDetailConvertedManaCost)(newState),
        typeLine: withCardId(cardDetailTypeLine)(newState),
        oracleText: withCardId(cardDetailOracleText)(newState),
        flavorText: withCardId(cardDetailFlavorText)(newState),
        imageUrl: withCardId(cardDetailImageUrl)(newState)
      });
    }
  });
};
