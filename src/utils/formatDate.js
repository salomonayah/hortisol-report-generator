import { format } from "date-fns";
import convertDateFormat from "./convertDateFormat";

export default function formatDate(dateToFormat, formatStr) {
  if (!(typeof dateStr === "object")) {
    dateToFormat = convertDateFormat(dateToFormat);
  }
  formatStr = formatStr === "YYYY-MM-DD" ? "yyyy-MM-dd" : "yyyy.MM.dd";
  try {
    const formattedDate = format(new Date(dateToFormat), formatStr);
    return formattedDate;
  } catch (error) {
    return format(new Date(), formatStr);
  }
}