import getOr from "lodash/fp/getOr";
import reduce from "lodash/fp/reduce";
import find from "lodash/fp/find";
import flow from "lodash/fp/flow";
import isNil from "lodash/fp/isNil";
import cond from "lodash/fp/cond";
import stubTrue from "lodash/fp/stubTrue";

export default (state = {}, { id, cardIds } = {}) => {
  const stateCards = getOr([], `allStacks.${id}.cards`)(state);

  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        ...state.allStacks[id],
        cards: reduce(
          (existingCards, cardId) =>
            flow([
              find({ id: cardId }),
              cond([
                [
                  isNil,
                  () => [
                    ...existingCards,
                    { id: cardId, count: 1, collapsed: true }
                  ]
                ],
                [
                  stubTrue,
                  () =>
                    reduce(
                      (result, card) =>
                        card.id === cardId
                          ? [
                              ...result,
                              {
                                ...card,
                                count: card.count + 1
                              }
                            ]
                          : [...result, card],
                      []
                    )(existingCards)
                ]
              ])
            ])(existingCards),
          stateCards
        )(cardIds)
      }
    }
  };
};
