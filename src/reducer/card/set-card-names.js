export default (state = {}, { names } = {}) => {
  return {
    ...state,
    allCardNames: names
  };
};
