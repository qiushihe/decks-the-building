import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";

const uncappedReduce = reduce.convert({ cap: false });

export default (state = {}, { id, cardIndex, change } = {}) => {
  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        ...state.allStacks[id],
        cards: flow([
          get(`allStacks.${id}.cards`),
          uncappedReduce((result, card, index) => {
            if (index === cardIndex) {
              const newCount = card.count + change;
              return newCount > 0
                ? [
                    ...result,
                    {
                      ...card,
                      count: newCount
                    }
                  ]
                : result;
            } else {
              return [...result, card];
            }
          }, [])
        ])(state)
      }
    }
  };
};
