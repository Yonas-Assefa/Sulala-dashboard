export const getUserTimezone = () => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = new Date();

  const localTime = now.getTime();

  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;

  const offsetMilliseconds = localTime - utcTime;

  const offsetHours = offsetMilliseconds / (1000 * 60 * 60);
  const hours = Math.floor(Math.abs(offsetHours));
  const minutes = Math.abs(
    (offsetMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
  );

  const sign = offsetHours >= 0 ? "+" : "-";
  const formattedOffset = `UTC ${sign}${hours}:${minutes.toString().padStart(2, "0")}`;

  const userTimezoneWithOffset = `${userTimezone} (${formattedOffset})`.replace(
    "_",
    " ",
  );
  return { userTimezone, userTimezoneWithOffset };
};
