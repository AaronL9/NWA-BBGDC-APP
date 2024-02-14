import { formatDistanceToNow, format } from "date-fns";

export const formatTimestamp = (timestamp) => {
  if (
    !timestamp ||
    typeof timestamp.seconds !== "number" ||
    typeof timestamp.nanoseconds !== "number"
  ) {
    return "Invalid timestamp";
  }

  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  return formatDistanceToNow(date, { addSuffix: true });
};

export function formatDateToString(date) {
  if (!(date instanceof Date) || isNaN(date)) {
    throw new Error("Invalid Date object");
  }

  const formattedDate = format(date, "MMMM d, yyyy");

  return formattedDate;
}
