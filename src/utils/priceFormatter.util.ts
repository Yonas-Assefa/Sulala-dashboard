export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KWD",
    minimumFractionDigits: 2, // Set the minimum number of decimal places you want to display
    maximumFractionDigits: 2, // Set the maximum number of decimal places you want to display
  }).format(number);
};
