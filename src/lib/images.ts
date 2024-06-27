import { IMAGE_BASE_URL } from "@/config/urls";

export const constructImageUrl = (
  arg: string | string[],
  returnOne: boolean,
) => {
  if (Array.isArray(arg)) {
    if (arg.length === 0) {
      return [];
    }
    if (returnOne) {
      return new URL(arg[0], IMAGE_BASE_URL).href;
    }
    return arg.map((url) => new URL(url, IMAGE_BASE_URL).href);
  }
  if (!arg) {
    return "";
  }
  return new URL(arg, IMAGE_BASE_URL).href;
};

export const deconstructImageUrl = (url: string | string[]): string => {
  if (!url) {
    return "";
  }
  if (Array.isArray(url)) {
    return deconstructImageUrl(url[0]);
  }
  return new URL(url, IMAGE_BASE_URL).pathname;
};
