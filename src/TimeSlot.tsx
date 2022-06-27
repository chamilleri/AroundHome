import classNames from "classnames";
import { TimeSlot as TimeSlotType } from "./CompanyTimeSlots";
import "./TimeSlot.scss";
import { getTimeSlotTime } from "./utils";

type TimeSlotProps = {
  slot: TimeSlotType;
  disabled?: boolean;
  selected?: boolean;
  onClick: (ts: TimeSlotType) => void;
};

export const TimeSlot = ({
  slot,
  disabled,
  selected,
  onClick
}: TimeSlotProps) => {
  return (
    <div
      className={classNames("time-slot", {
        "time-slot--disabled": disabled && !selected,
        "time-slot--selected": selected
      })}
      onClick={() => onClick(slot)}
    >
      {getTimeSlotTime(new Date(slot.start_time), new Date(slot.end_time))}
    </div>
  );
};
