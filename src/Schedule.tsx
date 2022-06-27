import "./Schedule.scss";
import { TimeSlots } from "./TimeSlots";
import {
  TimeSlot as TimeSlotType,
  CompanyTimeSlots,
  getCompanyTimeSlots
} from "./CompanyTimeSlots";
import { useState } from "react";
import { isSameTimeSlot } from "./utils/TimeSlotUtils";

type SelectedTimeSlot = {
  companyId: number;
  slot: TimeSlotType;
};

export const Schedule = () => {
  const companyTimeSlots = getCompanyTimeSlots();
  const [selectedSlots, setSelectedSlots] = useState<SelectedTimeSlot[]>([]);

  return (
    <div className="schedule">
      {companyTimeSlots.map((company: CompanyTimeSlots) => {
        return (
          <div key={"comp" + company.id} className="schedule__company">
            <div className="schedule__company-name">{company.name}</div>

            <TimeSlots
              timeSlots={company.time_slots}
              occupiedSlots={selectedSlots.map((s) => s.slot)}
              onSlotClicked={(slot) => {
                const newSlot = { companyId: company.id, slot: slot };
                const removeSlot =
                  selectedSlots.filter(
                    (s) =>
                      s.companyId === newSlot.companyId &&
                      isSameTimeSlot(s.slot, newSlot.slot)
                  ).length > 0;
                setSelectedSlots([
                  ...(removeSlot ? [] : [newSlot]),
                  ...selectedSlots.filter((s) => s.companyId !== company.id)
                ]);
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Schedule;
