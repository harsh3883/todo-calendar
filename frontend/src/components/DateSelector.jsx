import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef } from "react";

const DateSelector = ({ dates, selectedDate, setSelectedDate, isSameDate }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center space-x-2 bg-card rounded-lg border p-2 w-full overflow-hidden">
        {/* Left Scroll Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Scrollable Date List */}
        <div className="flex-1 overflow-x-auto" ref={scrollContainerRef}>
          <div className="flex space-x-2 min-w-max p-1">
            {dates.map((date, index) => {
              const isSelected = isSameDate(date, selectedDate);
              const isToday = isSameDate(date, new Date());

              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0"
                >
                  <Button
                    variant={isSelected ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedDate(date)}
                    className={cn(
                      "flex flex-col h-auto p-2 min-w-[60px]",
                      //selected date only
                      isSelected && "bg-primary text-primary-foreground",
                      //not selected date but today's date
                      isToday &&
                        !isSelected &&
                        "bg-accent text-accent-foreground border-2 border-primary/20",
                      //normal dates(neither selected nor today)
                      !isSelected && !isToday && "hover:bg-accent"
                    )}
                  >
                    <span className="text-xs font-medium">
                      {date.toLocaleDateString("en", { weekday: "short" })}
                    </span>
                    <span className="text-lg font-bold">{date.getDate()}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Scroll Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 flex-shrink-0"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DateSelector;
