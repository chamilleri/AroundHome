import timeSlots from "./time_slots.json";

export type TimeSlot = {
  start_time: Date;
  end_time: Date;
};

export type CompanyTimeSlots = {
  id: number;
  name: string;
  type: string;
  time_slots: TimeSlot[];
};

// Function to fetch data from API
export const getCompanyTimeSlots = (): CompanyTimeSlots[] => {
  //mapping timestamp to Date ease of use in the app
  return timeSlots.map(({ time_slots, ...rest }) => {
    return {
      ...rest,
      time_slots: time_slots.map((timeSlot) => {
        return {
          start_time: new Date(timeSlot.start_time),
          end_time: new Date(timeSlot.end_time)
        };
      })
    };
  });
};
