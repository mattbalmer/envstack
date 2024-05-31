export default <E extends object>(options: {
  env?: string,
  target?: string,
} = {}) => {
  return {
    ...options,
  };
}