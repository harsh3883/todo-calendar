import { Clock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const TodoCard = ({
  todo,
  category,
  handleEditTodo,
  handleDelete,
  toggleComplete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <Card
        className={cn(
          "cursor-pointer transition-all hover:shadow-md group border-l-4",
          todo.completed && "opacity-50",
          category.bgLight,
          category.textColor,
          category.color
        )}
        onClick={(e) => {
          e.stopPropagation();
          handleEditTodo(todo);
        }}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between space-x-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <div className={cn("w-2 h-2 rounded-full", category.color)} />
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    category.bgLight,
                    category.textColor
                  )}
                >
                  {category.name}
                </Badge>
              </div>

              <h3
                className={cn(
                  "font-medium text-sm leading-tight",
                  todo.completed && "line-through text-muted-foreground"
                )}
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {todo.description}
                </p>
              )}

              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>
                  {todo.timeStart} - {todo.timeEnd}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={(checked) => {
                  const event = { stopPropagation: () => {} };
                  event.stopPropagation();
                  toggleComplete(todo);
                }}
                onClick={(e) => e.stopPropagation()}
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
              />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => e.stopPropagation()}
                    className="h-6 w-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Todo</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{todo.title}"? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(todo.id);
                      }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodoCard;
