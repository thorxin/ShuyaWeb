const dateFormatter = (date = "") => {
  let currentDate = new Date();
  let newDate = new Date(date || "");
  let diff = (new Date(currentDate).getTime() - newDate.getTime()) / 1000;
  let day_diff = Math.floor(diff / 86400);
  const option = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };

  return (
    (day_diff === 0 &&
      ((diff < 60 && "Just Now") ||
        (diff < 120 && "1 minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
        (diff < 7200 && "1 hour ago") ||
        (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
    new Date(date).toLocaleDateString("en-US", option)
  );
};
export default dateFormatter;

export const dateFormatterYYMMDD = ( date = "" ) => {
  const option = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString("en-US", option);
}
