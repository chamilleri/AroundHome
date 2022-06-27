export const getDate = (date: Date) => {
  return date.toLocaleDateString();
};

export const getDateWithoutTime = (date: Date) => {
  return new Date(getDate(date));
};

export const getTime = (date: Date) => {
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;
};

export const getDayOfWeek = (date: Date) => {
  return date.toLocaleString("en-gb", { weekday: "long" });
};
