import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import size from "lodash/fp/size";
import lt from "lodash/fp/lt";
import includes from "lodash/fp/includes";
import find from "lodash/fp/find";
import negate from "lodash/fp/negate";
import isNil from "lodash/fp/isNil";

import { fromProps } from "/src/util/selector.util";

import { card as cardState } from "./root.selector";

export const allCardNames = createSelector(cardState, get("allCardNames"));

export const allCardSymbols = createSelector(cardState, get("allCardSymbols"));

export const cardSymbol = createSelector(
  fromProps(get("symbol")),
  allCardSymbols,
  (symbol, allSymbols) =>
    find({ symbol: `${symbol}`.trim().toUpperCase() })(allSymbols)
);

export const cardSymbolLabel = createSelector(cardSymbol, get("label"));

export const cardSymbolImageUrl = createSelector(cardSymbol, get("imageUrl"));

export const cardById = createSelector(
  fromProps(get("cardId")),
  cardState,
  (cardId, state) => flow([get("allCards"), get(cardId)])(state)
);

export const cardName = createSelector(cardById, get("name"));

export const cardError = createSelector(cardById, get("error"));

export const cardHasError = createSelector(cardError, negate(isNil));

export const cardDetail = createSelector(cardById, get("detail"));

export const cardDetailImageUrls = createSelector(
  cardDetail,
  getOr([], "imageUrls")
);

export const cardDetailLayout = createSelector(cardDetail, get("layout"));

export const cardDetailColorIdentity = createSelector(
  cardDetail,
  get("colorIdentity")
);

export const cardDetailManaCost = createSelector(cardDetail, get("manaCost"));

export const cardDetailImageUrl = createSelector(
  fromProps(getOr(0, "imageAlternation")),
  cardDetailImageUrls,
  (imageAlternation, imageUrls) =>
    get(imageAlternation % size(imageUrls))(imageUrls)
);

export const cardDetailImageUrlsCount = createSelector(
  cardDetailImageUrls,
  size
);

export const cardDetailHasAlternateImage = createSelector(
  cardDetailImageUrlsCount,
  cardDetailLayout,
  (urlsCount, layout) => lt(1)(urlsCount) || includes(layout)(["flip"])
);
