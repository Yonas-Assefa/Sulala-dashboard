export function formatFileSize(bytes: number): {
  text: string;
  value: number;
  unit: string;
} {
  if (bytes === 0) return { text: "0 B", value: 0, unit: "B" };

  const units = ["B", "KB", "MB", "GB", "TB"];
  const threshold = 1024;

  const i = Math.floor(Math.log(bytes) / Math.log(threshold));
  const value = bytes / Math.pow(threshold, i);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return {
    text: `${formatter.format(value)} ${units[i]}`,
    value: value,
    unit: units[i],
  };
}
