export default function convertDateFormat(dateString) {
  if (typeof dateString === "string") {
    const parts = dateString.split(".");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    const formattedDate = year + "-" + month + "-" + day;
    return formattedDate;
  } else {
    return dateString;
  }
}
