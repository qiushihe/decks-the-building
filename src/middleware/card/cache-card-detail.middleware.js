import Promise from "bluebird";

import {
  RESTORE_FROM_SCRYFALL,
  RESTORE_FROM_S3
} from "/src/action/card.action";
import { withProps } from "/src/util/selector.util";
import { record } from "/src/storage";

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
      const cardRecord = record("Card", cardId);

      return Promise.resolve()
        .then(() => cardRecord.setAttr("name", withCardId(cardName)(newState)))
        .then(() =>
          cardRecord.setAttr(
            "manaCost",
            withCardId(cardDetailManaCost)(newState)
          )
        )
        .then(() =>
          cardRecord.setAttr(
            "convertedManaCost",
            withCardId(cardDetailConvertedManaCost)(newState)
          )
        )
        .then(() =>
          cardRecord.setAttr(
            "typeLine",
            withCardId(cardDetailTypeLine)(newState)
          )
        )
        .then(() =>
          cardRecord.setAttr(
            "oracleText",
            withCardId(cardDetailOracleText)(newState)
          )
        )
        .then(() =>
          cardRecord.setAttr(
            "flavorText",
            withCardId(cardDetailFlavorText)(newState)
          )
        )
        .then(() =>
          cardRecord.setAttr(
            "imageUrl",
            withCardId(cardDetailImageUrl)(newState)
          )
        );
    }
  });
};
