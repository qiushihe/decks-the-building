import { createSelector } from "reselect";
import flow from "lodash/fp/flow";
import get from "lodash/fp/get";

import { card as cardState } from "./root.selector";

export const cardById = createSelector(
  (_, { cardId }) => cardId,
  cardState,
  (cardId, state) => flow([get("allCards"), get(cardId)])(state)
);

export const cardName = createSelector(cardById, get("name"));
