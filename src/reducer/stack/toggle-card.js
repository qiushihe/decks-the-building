import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";

export default (state = {}, { id, cardId } = {}) => {
  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        ...state.allStacks[id],
        cards: flow([
          get(`allStacks.${id}.cards`),
          reduce(
            (result, card) =>
              card.id === cardId
                ? [
                    ...result,
                    {
                      ...card,
                      collapsed: !card.collapsed
                    }
                  ]
                : [...result, card],
            []
          )
        ])(state)
      }
    }
  };
};
