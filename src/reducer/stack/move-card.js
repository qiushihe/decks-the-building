import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import getOr from "lodash/fp/getOr";
import reduce from "lodash/fp/reduce";

const uncappedReduce = reduce.convert({ cap: false });

export default (
  state = {},
  { fromId, toId, fromCardIndex, toCardIndex } = {}
) => {
  if (fromId === toId) {
    const fromCard = get(`allStacks.${fromId}.cards.${fromCardIndex}`)(state);
    const toCard = get(`allStacks.${fromId}.cards.${toCardIndex}`)(state);
    const stack = get(`allStacks.${fromId}`)(state);

    const cards = [...getOr([], "cards")(stack)];
    cards[fromCardIndex] = toCard;
    cards[toCardIndex] = fromCard;

    return {
      ...state,
      allStacks: {
        ...state.allStacks,
        [fromId]: {
          ...stack,
          cards
        }
      }
    };
  } else {
    const movedCard = get(`allStacks.${fromId}.cards.${fromCardIndex}`)(state);
    const fromStack = get(`allStacks.${fromId}`)(state);
    const toStack = get(`allStacks.${toId}`)(state);
    const toStackCards = [...getOr([], "cards")(toStack)];

    return {
      ...state,
      allStacks: {
        ...state.allStacks,
        [fromId]: {
          ...fromStack,
          cards: flow([
            getOr([], "cards"),
            uncappedReduce(
              (result, card, index) =>
                index === fromCardIndex ? result : [...result, card],
              []
            )
          ])(fromStack)
        },
        [toId]: {
          ...toStack,
          cards: [
            ...toStackCards.slice(0, toCardIndex),
            movedCard,
            ...toStackCards.slice(toCardIndex)
          ]
        }
      }
    };
  }
};
