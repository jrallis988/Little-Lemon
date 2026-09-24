export interface BookingDay {
  id: string;
  label: string;
  date: string;
  weekday: string;
}

export interface BookingSlot {
  id: string;
  time: string;
  available: boolean;
}

function formatDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getBookingDays(count = 5): BookingDay[] {
  const days: BookingDay[] = [];
  const start = new Date();
  start.setHours(12, 0, 0, 0);
  for (let offset = 1; offset <= count + 2 && days.length < count; offset += 1) {
    const day = new Date(start);
    day.setDate(start.getDate() + offset);
    const weekday = day.getDay();
    if (weekday === 0) continue; // skip Sundays in demo
    days.push({
      id: formatDateKey(day),
      date: formatDateKey(day),
      label: day.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      weekday: day.toLocaleDateString(undefined, { weekday: "short" }),
    });
  }
  return days;
}

export function getBookingSlots(date: string, serviceId: string): BookingSlot[] {
  const hours = [9, 10, 11, 13, 14, 15, 16, 17];
  const seed = [...`${date}-${serviceId}`].reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  return hours.map((hour, index) => {
    const unavailable = (seed + index) % 5 === 0;
    const time = `${String(hour).padStart(2, "0")}:00`;
    return {
      id: `${date}-${time}`,
      time,
      available: !unavailable,
    };
  });
}
