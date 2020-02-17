import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";
import includes from "lodash/fp/includes";

const uncappedReduce = reduce.convert({ cap: false });

export default (state = {}, { id, cardIndices } = {}) => {
  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        ...state.allStacks[id],
        cards: flow([
          get(`allStacks.${id}.cards`),
          uncappedReduce(
            (result, card, index) =>
              includes(index)(cardIndices)
                ? [
                    ...result,
                    { ...card, imageAlternation: card.imageAlternation + 1 }
                  ]
                : [...result, card],
            []
          )
        ])(state)
      }
    }
  };
};
