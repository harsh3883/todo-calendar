import TodoCard from "./TodoCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const TimeSlot = ({
  timeSlot,
  todosInSlot,
  handleTimeSlotClick,
  handleEditTodo,
  handleDelete,
  toggleComplete,
  categories,
}) => {
  return (
    //to adjust the label and card horizontally
    <div className="flex min-h-[120px]">
      {/* Time Label */}
      <div className="w-16 flex-shrink-0 pr-4">
        <Badge
          variant="outline"
          className="text-l font-bold text-muted-foreground whitespace-nowrap"
        >
          {timeSlot}
        </Badge>
      </div>

      {/* Time Slot Content */}
      <div className="flex-1">
        <Card
          className={cn(
            "min-h-[100px] cursor-pointer transition-all border-dashed",
            todosInSlot.length === 0
              ? "hover:border-primary/50 hover:bg-accent/50"
              : "border-solid"
          )}
          onClick={() => handleTimeSlotClick(timeSlot)}
        >
          <CardContent className="p-4">
            {todosInSlot.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[68px] text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Click to add todo</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {todosInSlot.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    category={categories[todo.category]}
                    handleEditTodo={handleEditTodo}
                    handleDelete={handleDelete}
                    toggleComplete={toggleComplete}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeSlot;
