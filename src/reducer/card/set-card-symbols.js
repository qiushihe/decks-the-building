import reduce from "lodash/fp/reduce";

export default (state = {}, { symbols } = {}) => {
  return {
    ...state,
    allCardSymbols: reduce(
      (result, { symbol, english, svg_uri }) => [
        ...result,
        {
          symbol: `${symbol}`.trim().toUpperCase(),
          label: english,
          imageUrl: svg_uri
        }
      ],
      []
    )(symbols)
  };
};
