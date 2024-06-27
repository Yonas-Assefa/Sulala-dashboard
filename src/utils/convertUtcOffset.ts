export const convertUtcOffset = (utcOffset: string): string => {
  const sign = utcOffset[0];
  const hours = parseInt(utcOffset.slice(1, 3), 10);

  const signSymbol = sign === "+" ? "+" : "-";
  const result = `UTC ${signSymbol} ${hours}`;

  return result;
};
