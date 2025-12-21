"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  trigger?: React.ReactNode;
}

const DatePicker = ({ date, onDateChange, trigger }: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date || new Date()
  );
  const [activeTab, setActiveTab] = useState("date");

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  const formatDateDisplay = (date: Date | undefined): string => {
    if (!date) return "Select date";
    return format(date, "MMM d");
  };

  const handleApply = () => {
    if (onDateChange) {
      onDateChange(selectedDate);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setSelectedDate(date || new Date());
    setOpen(false);
  };

  const defaultTrigger = (
    <Button variant="ghost" className="w-full justify-start rounded-none">
      <CalendarIcon className="size-5 text-primary" />
      {formatDateDisplay(date || selectedDate)}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent
        className="max-w-full top-auto bottom-0 translate-y-0 -translate-x-1/2 left-1/2 rounded-t-sm rounded-b-none p-0 gap-0 max-h-[66vh] flex flex-col pt-4 md:max-w-md md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:rounded-lg md:max-h-[80vh]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Select date</DialogTitle>
        <DialogDescription className="sr-only">
          Choose a date from the calendar or use flexible dates
        </DialogDescription>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex flex-col flex-1 min-h-0"
        >
          <TabsList className="w-full justify-start rounded-none border-b border-gray-light shrink-0">
            <TabsTrigger value="date" className="px-6">
              Date
            </TabsTrigger>
            <TabsTrigger value="flexible" className="px-6">
              Flexible
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="date"
            className="mt-0 p-6 flex flex-col flex-1 min-h-0 overflow-y-auto"
          >
            <div className="flex-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
                captionLayout="label"
                showOutsideDays={true}
              />
            </div>
          </TabsContent>
          <TabsContent
            value="flexible"
            className="mt-0 p-6 flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 py-8 text-center text-secondary">
              Flexible dates coming soon
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex gap-3 p-4 border-t border-gray-light shrink-0">
          <Button variant="ghost" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1"
            disabled={activeTab === "flexible"}
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DatePicker;
