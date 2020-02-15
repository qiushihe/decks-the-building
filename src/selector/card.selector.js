import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";

import { fromProps } from "/src/util/selector.util";

import { card as cardState } from "./root.selector";

export const allCardNames = createSelector(cardState, get("allCardNames"));

export const cardById = createSelector(
  fromProps(get("cardId")),
  cardState,
  (cardId, state) => flow([get("allCards"), get(cardId)])(state)
);

export const cardName = createSelector(cardById, get("name"));

export const cardDetail = createSelector(cardById, get("detail"));

export const cardHasDetail = createSelector(cardDetail, negate(isEmpty));

export const cardDetailManaCost = createSelector(cardDetail, get("manaCost"));

export const cardDetailConvertedManaCost = createSelector(
  cardDetail,
  get("convertedManaCost")
);

export const cardDetailTypeLine = createSelector(cardDetail, get("typeLine"));

export const cardDetailOracleText = createSelector(
  cardDetail,
  get("oracleText")
);

export const cardDetailFlavorText = createSelector(
  cardDetail,
  get("flavorText")
);

export const cardDetailImageUrl = createSelector(cardDetail, get("imageUrl"));
