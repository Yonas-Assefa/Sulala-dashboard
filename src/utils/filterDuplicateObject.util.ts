type EventObject = {
  event: string;
  created_at: string;
};

export const filterUniqueOrderTimline = (
  arr: EventObject[] | [],
): EventObject[] | [] => {
  const seenEvents = new Set<string>();
  return arr.filter((item) => {
    if (seenEvents.has(item.event) || item.event == "") {
      return false;
    } else {
      seenEvents.add(item.event);
      return true;
    }
  });
};
