//Storing only dates(ignore time values)
export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Format time as HH:MM
export const formatTime = (time) => {
  return `${time}:00`;
};

// Check if two dates are the same (ignoring time)
export const isSameDate = (date1, date2) => {
  return formatDate(date1) === formatDate(date2);
};

// Convert time string to minutes for easier comparison
export const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

// Convert minutes back to time string
export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

// Check if a todo falls within a specific time slot
export const todoFitsInTimeSlot = (todo, timeSlot) => {
  const todoStartMinutes = timeToMinutes(todo.timeStart);
  const todoEndMinutes = timeToMinutes(todo.timeEnd);
  const slotMinutes = timeToMinutes(timeSlot);

  // Todo fits in slot if it starts at or before the slot time and ends after the slot time
  // OR if it starts within the slot's 30-minute window
  const slotEndMinutes = slotMinutes + 30; // 30-minute slots

  return (
    (todoStartMinutes <= slotMinutes && todoEndMinutes > slotMinutes) ||
    (todoStartMinutes >= slotMinutes && todoStartMinutes < slotEndMinutes)
  );
};

// Get the primary time slot for a todo (where it should be displayed)
export const getPrimaryTimeSlot = (todo) => {
  const startMinutes = timeToMinutes(todo.timeStart);

  // Round down to the nearest 30-minute mark
  const slotStartMinutes = Math.floor(startMinutes / 30) * 30;

  return minutesToTime(slotStartMinutes);
};

// Filter todos for a specific time slot
export const getTodosForTimeSlot = (todos, timeSlot, selectedDate) => {
  return todos.filter((todo) => {
    // Check if todo is on the selected date
    const todoDate = new Date(todo.date);
    if (!isSameDate(todoDate, selectedDate)) {
      return false;
    }

    // Check if todo fits in this time slot
    return todoFitsInTimeSlot(todo, timeSlot);
  });
};

// Validate time range (end time should be after start time)
export const validateTimeRange = (startTime, endTime) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  return endMinutes > startMinutes;
};

// Get duration in minutes
export const getDurationInMinutes = (startTime, endTime) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  return endMinutes - startMinutes;
};

// Format duration as "Xh Ym"
export const formatDuration = (startTime, endTime) => {
  const durationMinutes = getDurationInMinutes(startTime, endTime);
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) {
    return `${minutes}m`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
};
