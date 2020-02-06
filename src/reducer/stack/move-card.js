import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";

import { addItem, removeItem } from "/src/util/array.util";

export default (
  state = {},
  { fromId, toId, fromCardIndex, toCardIndex } = {}
) => {
  if (fromId === toId) {
    const card = get(`allStacks.${fromId}.cards.${fromCardIndex}`)(state);
    const stack = get(`allStacks.${fromId}`)(state);

    return {
      ...state,
      allStacks: {
        ...state.allStacks,
        [fromId]: {
          ...stack,
          cards: flow([
            getOr([], "cards"),
            removeItem(fromCardIndex),
            addItem(card, toCardIndex)
          ])(stack)
        }
      }
    };
  } else {
    const card = get(`allStacks.${fromId}.cards.${fromCardIndex}`)(state);
    const fromStack = get(`allStacks.${fromId}`)(state);
    const toStack = get(`allStacks.${toId}`)(state);

    return {
      ...state,
      allStacks: {
        ...state.allStacks,
        [fromId]: {
          ...fromStack,
          cards: flow([getOr([], "cards"), removeItem(fromCardIndex)])(
            fromStack
          )
        },
        [toId]: {
          ...toStack,
          cards: flow([getOr([], "cards"), addItem(card, toCardIndex)])(toStack)
        }
      }
    };
  }
};
