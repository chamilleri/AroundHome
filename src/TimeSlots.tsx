import "./TimeSlots.scss";
import {
  getDate,
  getDayOfWeek,
  getTimeSlotDate,
  getTimeSlotTime,
  isSlotAvailable
} from "./utils";
import { TimeSlot } from "./TimeSlot";
import { TimeSlot as TimeSlotType } from "./CompanyTimeSlots";
import { useState } from "react";

type TimeSlotsProps = {
  timeSlots: TimeSlotType[];
  occupiedSlots?: TimeSlotType[];
  onSlotClicked: (slot: TimeSlotType) => void;
};

type FormattedTimeSlots = {
  date: Date;
  slots: TimeSlotType[];
};

const formatTimeSlots = (timeSlots: TimeSlotType[]) => {
  return timeSlots.reduce(
    (previousValue: FormattedTimeSlots[], currentValue: TimeSlotType) => {
      const start = new Date(currentValue.start_time);
      const date = new Date(start);
      const existing = previousValue.find(
        (slot) => slot.date.toDateString() === date.toDateString()
      );

      if (existing) {
        existing.slots.push(currentValue);
        return previousValue;
      } else {
        return [
          ...previousValue,
          {
            date: new Date(currentValue.start_time),
            slots: [currentValue]
          }
        ];
      }
    },
    []
  );
};

export const TimeSlots = ({
  timeSlots,
  occupiedSlots = [],
  onSlotClicked
}: TimeSlotsProps) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType>();
  const formattedTimeSlot = formatTimeSlots(timeSlots);

  return (
    <div className="time-slots">
      <div className="time-slots__selected">
        {selectedSlot && (
          <>
            <div>{getTimeSlotDate(new Date(selectedSlot.start_time))}</div>

            <div>
              {getTimeSlotTime(
                new Date(selectedSlot.start_time),
                new Date(selectedSlot.end_time)
              )}
            </div>
          </>
        )}
      </div>
      {formattedTimeSlot.map((formatted) => (
        <div key={"slots" + formatted.date}>
          <div>
            <div className="time-slots__day-of-week">
              {getDayOfWeek(formatted.date)}
            </div>
            <div className="time-slots__date">{getDate(formatted.date)}</div>

            {formatted.slots.map((slot) => (
              <TimeSlot
                key={"slot" + slot.start_time}
                slot={slot}
                disabled={isSlotAvailable(occupiedSlots, slot)}
                selected={slot === selectedSlot}
                onClick={(slot) => {
                  setSelectedSlot(slot === selectedSlot ? undefined : slot);
                  onSlotClicked(slot);
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
