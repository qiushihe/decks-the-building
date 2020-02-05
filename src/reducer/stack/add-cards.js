import getOr from "lodash/fp/getOr";
import reduce from "lodash/fp/reduce";
import find from "lodash/fp/find";
import flow from "lodash/fp/flow";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";

export default (state = {}, { id, cardIds } = {}) => {
  const stateCards = getOr([], `allStacks.${id}.cards`)(state);

  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        ...state.allStacks[id],
        cards: reduce((existingCards, cardId) => {
          if (flow([find({ id: cardId }), negate(isEmpty)])(existingCards)) {
            return reduce((result, card) => {
              return card.id === cardId
                ? [
                    ...result,
                    {
                      ...card,
                      count: card.count + 1
                    }
                  ]
                : [...result, card];
            }, [])(existingCards);
          } else {
            return [
              ...existingCards,
              { id: cardId, count: 1, collapsed: true }
            ];
          }
        }, stateCards)(cardIds)
      }
    }
  };
};
