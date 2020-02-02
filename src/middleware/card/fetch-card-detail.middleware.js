import Promise from "bluebird";
import map from "lodash/fp/map";
import flow from "lodash/fp/flow";

import { ADD, UPDATE, restore } from "/src/action/card.action";
import { withProps } from "/src/util/selector.util";
import { getFetchCardQueue } from "/src/api/scryfall.api";
import { record } from "/src/storage";

import {
  cardName,
  cardHasDetail,
  cardDetailManaCost,
  cardDetailConvertedManaCost,
  cardDetailTypeLine,
  cardDetailOracleText,
  cardDetailFlavorText,
  cardDetailImageUrl
} from "/src/selector/card.selector";

export default ({ getState, dispatch }) => next => action => {
  const { type: actionType } = action;

  return Promise.resolve(next(action)).then(() => {
    if (actionType === ADD) {
      const newState = getState();

      const {
        payload: { id: cardId, name }
      } = action;

      const withCardId = withProps({ cardId });
      const cardRecord = record("Card", cardId);

      if (!withCardId(cardHasDetail)(newState)) {
        return cardRecord.exists().then(exists => {
          if (exists) {
            const details = {};
            return cardRecord
              .getAttrs()
              .then(
                flow([
                  map(name =>
                    cardRecord.getAttr(name).then(value => {
                      details[name] = value;
                    })
                  ),
                  Promise.all
                ])
              )
              .then(() => dispatch(restore({ id: cardId, ...details })));
          } else {
            return getFetchCardQueue({ dispatch }).fetch({ cardId, name });
          }
        });
      }
    } else if (actionType === UPDATE) {
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
