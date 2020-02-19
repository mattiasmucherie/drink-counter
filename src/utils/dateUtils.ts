export const dateToString = (date: Date) => {
  let minutes = new Date(date).getMinutes();
  const hours = new Date(date).getHours();
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear() - 2000;
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${day}/${month +
    1}/${year}`;
};
