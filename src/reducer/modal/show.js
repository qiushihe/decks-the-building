export default (state = {}, { name, props } = {}) => {
  return {
    ...state,
    activeModal: {
      name,
      props
    }
  };
};
