export default (state = {}, { login } = {}) => {
  return {
    ...state,
    login
  };
};
