export default (state = {}, { id, cardId } = {}) => {
  return {
    ...state,
    allStacks: {
      ...state.allStacks,
      [id]: {
        ...state.allStacks[id],
        cardIds: [...state.allStacks[id].cardIds, cardId]
      }
    }
  };
};
