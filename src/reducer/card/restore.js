export default (
  state = {},
  {
    id,
    name,
    manaCost,
    convertedManaCost,
    typeLine,
    oracleText,
    flavorText,
    imageUrl
  } = {}
) => {
  return {
    ...state,
    allCards: {
      ...state.allCards,
      [id]: {
        name,
        detail: {
          manaCost,
          convertedManaCost,
          typeLine,
          oracleText,
          flavorText,
          imageUrl
        }
      }
    }
  };
};
