import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import size from "lodash/fp/size";
import lt from "lodash/fp/lt";
import includes from "lodash/fp/includes";

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

export const cardDetailImageUrls = createSelector(
  cardDetail,
  getOr([], "imageUrls")
);

export const cardDetailLayout = createSelector(cardDetail, get("layout"));

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
