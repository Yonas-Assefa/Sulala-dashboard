const INITIAL_LOCALE = "ar";
const getDefaulLocale = () => {
  const NEXT_PUBLIC_DEFAULT_LOCALE = process.env.NEXT_PUBLIC_DEFAULT_LOCALE;
  if (
    NEXT_PUBLIC_DEFAULT_LOCALE &&
    typeof NEXT_PUBLIC_DEFAULT_LOCALE === "string"
  ) {
    const LOCALE = NEXT_PUBLIC_DEFAULT_LOCALE.toLowerCase();
    if (LOCALES.includes(LOCALE)) {
      console.info(`\x1b[35m  漢字 Default locale: ${LOCALE}\x1b[0m`);
      return LOCALE;
    } else {
      console.warn(
        `\x1b[33m  漢字 Default locale: ${LOCALE} is not supported. Defaulting to ${INITIAL_LOCALE}\x1b[0m`,
      );
      return INITIAL_LOCALE;
    }
  }
  console.warn(
    `\x1b[33m  漢字 Default locale is not set. Defaulting to ${INITIAL_LOCALE}\x1b[0m`,
  );
  return INITIAL_LOCALE;
};

export const LOCALES = ["en", "ar"];
export const DEFAULT_LOCALE = getDefaulLocale();
