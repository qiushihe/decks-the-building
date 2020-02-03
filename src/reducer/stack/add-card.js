import flow from "lodash/fp/flow";
import get from "lodash/fp/get";
import reduce from "lodash/fp/reduce";
import cond from "lodash/fp/cond";
import find from "lodash/fp/find";
import negate from "lodash/fp/negate";
import isEmpty from "lodash/fp/isEmpty";
import stubTrue from "lodash/fp/stubTrue";
import concat from "lodash/fp/concat";
import compact from "lodash/fp/compact";

export default (state = {}, { id, cardId } = {}) => {
  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        ...state.allStacks[id],
        cards: flow([
          get(`allStacks.${id}.cards`),
          cond([
            [
              flow([find({ id: cardId }), negate(isEmpty)]),
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
              )
            ],
            [stubTrue, flow([concat([{ id: cardId, count: 1 }]), compact])]
          ])
        ])(state)
      }
    }
  };
};
