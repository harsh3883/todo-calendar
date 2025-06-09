import { Calendar, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <div className="mr-6 flex items-center space-x-2">
            <Calendar className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Todo Calendar
            </span>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end mr-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
