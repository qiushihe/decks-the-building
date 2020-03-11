export default (state = {}, { id, name, props } = {}) => {
  return {
    ...state,
    activeTooltip: {
      id,
      name,
      props
    }
  };
};
