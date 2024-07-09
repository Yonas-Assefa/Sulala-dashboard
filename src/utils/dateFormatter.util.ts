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
    val as string,
  );
};

export const formatDate = (isoDate: any) => {
  if (isoDate) {
    const date = new Date(isoDate);

    // Months array for converting month index to month name
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get components from the date object
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Format day with "st", "nd", "rd" for 1, 2, 3, etc.
    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }

    // Convert hours to 12-hour format
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    const parsedMinutes = minutes < 10 ? "0" + minutes : minutes.toString(); // Ensure minutes are two digits

    // Construct the formatted date string
    const formattedDate = `${month} ${day}${daySuffix}, ${year}, ${hours}:${parsedMinutes} ${period}`;

    return formattedDate;
  }
};
