import "./TimeSlots.scss";
import { getDate, getDayOfWeek } from "./utils/DateUtils";
import {
  getTimeSlotDate,
  getTimeSlotTime,
  groupTimeSlotsByDate,
  isSameTimeSlot,
  isSlotAvailable
} from "./utils/TimeSlotUtils";
import { TimeSlot } from "./TimeSlot";
import { TimeSlot as TimeSlotType } from "./CompanyTimeSlots";
import { useState } from "react";

type TimeSlotsProps = {
  timeSlots: TimeSlotType[];
  occupiedSlots?: TimeSlotType[];
  onSlotClicked: (slot: TimeSlotType) => void;
};

export const TimeSlots = ({
  timeSlots,
  occupiedSlots = [],
  onSlotClicked
}: TimeSlotsProps) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType>();
  const groupedTimeSlots = groupTimeSlotsByDate(timeSlots);

  return (
    <div className="time-slots">
      <div className="time-slots__selected">
        {selectedSlot && (
          <>
            <div>{getTimeSlotDate(selectedSlot.start_time)}</div>

            <div>{getTimeSlotTime(selectedSlot)}</div>
          </>
        )}
      </div>
      {groupedTimeSlots.map((groupedTimeSlot) => (
        <div key={"slots" + groupedTimeSlot.date}>
          <div>
            <div className="time-slots__day-of-week">
              {getDayOfWeek(groupedTimeSlot.date)}
            </div>
            <div className="time-slots__date">
              {getDate(groupedTimeSlot.date)}
            </div>

            {groupedTimeSlot.slots.map((slot) => (
              <TimeSlot
                key={"slot" + slot.start_time}
                slot={slot}
                disabled={isSlotAvailable(occupiedSlots, slot)}
                selected={isSameTimeSlot(slot, selectedSlot)}
                onClick={(slot) => {
                  setSelectedSlot(
                    isSameTimeSlot(slot, selectedSlot) ? undefined : slot
                  );
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
