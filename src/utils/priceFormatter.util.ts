export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KWD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
