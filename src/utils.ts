import { TimeSlot } from "./CompanyTimeSlots";

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

export const getTimeSlotTime = (start: Date, end: Date) => {
  return `${getTime(start)} - ${getTime(end)}`;
};

export const getTimeSlotDate = (date: Date) => {
  return `${getDayOfWeek(date)} ${getDate(date)}`;
};

export const isSlotAvailable = (
  occupiedSlots: TimeSlot[],
  slot: TimeSlot
): boolean => {
  return (
    occupiedSlots.find((occ) => {
      const start = new Date(slot.start_time);
      const end = new Date(slot.end_time);
      const occStart = new Date(occ.start_time);
      const occEnd = new Date(occ.end_time);

      return (
        (occStart < end && occStart >= start) ||
        (occEnd < end && occEnd > start)
      );
    }) !== undefined
  );
};
