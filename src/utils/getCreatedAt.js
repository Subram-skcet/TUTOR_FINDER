import { formatDistanceToNow } from "date-fns";

export const extractDateFields = (createdAt) => {
    // Create a Date object from the ISO string
    const date = new Date(createdAt);

    // GMT+5:30 time zone offset in milliseconds
    // const offsetInMinutes = 330; // 5 hours 30 minutes
    // const offsetInMilliseconds = offsetInMinutes * 60 * 1000;

    // Apply the offset to the date to convert it to GMT+5:30
    const localDate = new Date(date.getTime());

    // Calculate the distance from now
    return formatDistanceToNow(localDate, { includeSeconds: true })+" ago";
};