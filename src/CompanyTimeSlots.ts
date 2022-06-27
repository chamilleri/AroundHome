import timeSlots from "./time_slots.json";

export type TimeSlot = {
  start_time: string;
  end_time: string;
};

export type CompanyTimeSlots = {
  id: number;
  name: string;
  type: string;
  time_slots: TimeSlot[];
};

// Function to fetch data from API
export const getCompanyTimeSlots = (): CompanyTimeSlots[] => {
  return timeSlots;
};
