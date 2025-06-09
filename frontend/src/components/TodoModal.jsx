import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { validateTimeRange } from "./time";

const TodoModal = ({
  showModal,
  setShowModal,
  modalData,
  setModalData,
  handleSubmit,
  categories,
}) => {
  const [showTimeError, setShowTimeError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateTimeRange(modalData.timeStart, modalData.timeEnd)) {
      setShowTimeError(true);
      return;
    }

    handleSubmit(e);
  };

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {modalData.id ? "Edit Todo" : "Create Todo"}
            </DialogTitle>
            <DialogDescription>
              {modalData.id
                ? "Make changes to your todo item here."
                : "Add a new todo item to your list."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Todo title..."
                value={modalData.title}
                onChange={(e) =>
                  setModalData({ ...modalData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={modalData.category}
                onValueChange={(value) =>
                  setModalData({ ...modalData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categories).map(([key, category]) => (
                    <SelectItem key={key} value={key}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={modalData.date}
                onChange={(e) =>
                  setModalData({ ...modalData, date: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeStart">Start Time</Label>
                <Input
                  id="timeStart"
                  type="time"
                  value={modalData.timeStart}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      timeStart: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeEnd">End Time</Label>
                <Input
                  id="timeEnd"
                  type="time"
                  value={modalData.timeEnd}
                  onChange={(e) =>
                    setModalData({ ...modalData, timeEnd: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                placeholder="Optional description..."
                value={modalData.description}
                onChange={(e) =>
                  setModalData({
                    ...modalData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {modalData.id ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog for invalid time range */}
      <AlertDialog open={showTimeError} onOpenChange={setShowTimeError}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invalid Time Range</AlertDialogTitle>
            <AlertDialogDescription>
              End time must be after the start time. Please correct the time
              range.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowTimeError(false)}>
              OK
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TodoModal;
