export const dataURLtoFile = (
  dataurl: string | undefined,
  filename: string,
) => {
  if (!dataurl) return new File([], filename);
  let arr = dataurl.split(","),
    mime = arr?.[0]?.match(/:(.*?);/)?.[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
