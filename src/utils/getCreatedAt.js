import { formatDistanceToNow } from "date-fns";

export const extractDateFields = (createdAt) => {
    // Create a Date object from the ISO string
    const date = new Date(createdAt);

    // GMT+5:30 time zone offset in milliseconds
    // const offsetInMinutes = 330; // 5 hours 30 minutes
    // const offsetInMilliseconds = offsetInMinutes * 60 * 1000;

    // Apply the offset to the date to convert it to GMT+5:30
    const localDate = new Date(date.getTime());

    // Extract the year, month, day, hours, minutes, and seconds
    const year = localDate.getFullYear();
    const month = localDate.getMonth();
    const day = localDate.getDate();
    const hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const seconds = localDate.getSeconds();


    // Calculate the distance from now
    return formatDistanceToNow(localDate, { includeSeconds: true })+" ago";
};