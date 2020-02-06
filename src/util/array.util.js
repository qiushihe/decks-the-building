import reduce from "lodash/fp/reduce";

const uncappedReduce = reduce.convert({ cap: false });

export const addItem = (item, toIndex) => items => [
  ...items.slice(0, toIndex),
  item,
  ...items.slice(toIndex)
];

export const removeItem = fromIndex =>
  uncappedReduce(
    (items, item, index) => (index === fromIndex ? items : [...items, item]),
    []
  );
