import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

export default (state = {}, { id, cardIds } = {}) => {
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
              includes(card.id)(cardIds)
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
