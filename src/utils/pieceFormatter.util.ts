// Function for formatting numbers with dollar sign and commas
export const formatPiece = (string: string | number): string => {
  const value = typeof string === "number" ? string.toString() : string;
  if (value.length < 1) {
    return "0pcs";
  } else if (value?.endsWith("pcs")) {
    return value;
  } else {
    return `${value}pcs`;
  }
};
