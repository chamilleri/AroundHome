import { TimeSlot } from "../CompanyTimeSlots";
import { getDate, getDayOfWeek, getTime } from "./DateUtils";

export const getTimeSlotTime = (timeSlot: TimeSlot) => {
  return `${getTime(timeSlot.start_time)} - ${getTime(timeSlot.end_time)}`;
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
      const start = slot.start_time;
      const end = slot.end_time;
      const occStart = occ.start_time;
      const occEnd = occ.end_time;

      return (
        (occStart < end && occStart >= start) ||
        (occEnd < end && occEnd > start)
      );
    }) !== undefined
  );
};

export const isSameTimeSlot = (ts1?: TimeSlot, ts2?: TimeSlot) => {
  return (
    ts1?.start_time.toISOString() === ts2?.start_time.toISOString() &&
    ts1?.end_time.toISOString() === ts2?.end_time.toISOString()
  );
};

type TimeSlotsByDate = {
  date: Date;
  slots: TimeSlot[];
};

export const groupTimeSlotsByDate = (
  timeSlots: TimeSlot[]
): TimeSlotsByDate[] => {
  return timeSlots.reduce(
    (previousValue: TimeSlotsByDate[], currentValue: TimeSlot) => {
      const date = currentValue.start_time;
      const existingDate = previousValue.find(
        (slot) => slot.date.toDateString() === date.toDateString()
      );

      if (existingDate) {
        existingDate.slots.push(currentValue);
        return previousValue;
      } else {
        return [
          ...previousValue,
          {
            date: currentValue.start_time,
            slots: [currentValue]
          }
        ];
      }
    },
    []
  );
};
