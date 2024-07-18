export const convertToArray = (arg: unknown) => {
  if (!arg) return [];
  return Array.isArray(arg) ? arg : [arg];
};
