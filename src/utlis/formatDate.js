export const FormatDate = (date) => {
  const _date = new Date(date);

  if (isNaN(_date)) {
    console.error("Invalid date:", date);
    return "Invalid Date";
  }

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(_date);

  return formattedDate;
};
