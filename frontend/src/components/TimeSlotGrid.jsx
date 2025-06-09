import TimeSlot from "../components/TimeSlot";
import { ScrollArea } from "@/components/ui/scroll-area";

const TimeSlotGrid = ({
  timeSlots,
  getTodosForTimeSlot,
  handleTimeSlotClick,
  handleEditTodo,
  handleDelete,
  toggleComplete,
  categories,
}) => {
  return (
    <div className="flex-1 p-4">
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-4 pr-4">
          {timeSlots.map((timeSlot) => {
            const todosInSlot = getTodosForTimeSlot(timeSlot);

            return (
              <TimeSlot
                key={timeSlot}
                timeSlot={timeSlot}
                todosInSlot={todosInSlot}
                handleTimeSlotClick={handleTimeSlotClick}
                handleEditTodo={handleEditTodo}
                handleDelete={handleDelete}
                toggleComplete={toggleComplete}
                categories={categories}
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TimeSlotGrid;
