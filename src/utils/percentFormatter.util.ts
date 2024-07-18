// Function for formatting numbers with dollar sign and commas
export const formatNumber = (number: number): string => {
  // if (isNaN(number)) return '0%';
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};
