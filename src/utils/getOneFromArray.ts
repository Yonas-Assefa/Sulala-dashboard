export const getoneFromArray = (arg: unknown) => {
  return Array.isArray(arg) ? arg[0] : arg;
};
