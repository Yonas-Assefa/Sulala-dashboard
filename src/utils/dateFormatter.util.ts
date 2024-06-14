export const changeLocaleToISO = (val: unknown) => {
  if (isLocalString(val)) {
    return new Date(val as string).toISOString();
  }
};

export const changeISOToLocaleDate = ({
  val,
  useDash,
}: {
  val: unknown;
  useDash?: boolean;
}) => {
  if (val) {
    const date = new Date(val as string).toLocaleDateString();
    if (useDash) return date.replaceAll("/", "-");
    return date;
  }
};

export const changeISOToLocaleTime = (val: unknown) => {
  if (val) {
    return new Date(val as string).toLocaleTimeString();
  }
};

export const changeISOToLocale = (val: unknown) => {
  if (val) {
    return new Date(val as string).toLocaleString();
  }
};

export const changeLocalToISODateOnly = (val: unknown) => {
  if (val) {
    const dateObj = new Date(val as string);
    return dateObj.toISOString().split("T")[0];
  }
};
const isLocalString = (val: unknown): boolean => {
  return /^\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{1,2}:\d{1,2} (AM)|(PM)$/.test(
    val as string
  );
};
