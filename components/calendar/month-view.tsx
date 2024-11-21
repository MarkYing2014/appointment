"use client";

import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay, startOfWeek, endOfWeek, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { NewEventDialog } from "./new-event-dialog";
import { EventDetailDialog } from "./event-detail-dialog";
import { SalesRep } from "@/types/sales-rep";

interface MonthViewProps {
  date: Date;
  selectedReps: string[];
  salesReps: SalesRep[];
}

export function MonthView({ date, selectedReps, salesReps }: MonthViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const events = [
    {
      id: 1,
      title: "Team Meeting",
      start: addDays(monthStart, 14),
      end: addDays(monthStart, 14),
      location: "Conference Room A",
      description: "Weekly team sync meeting",
      client: "Internal",
      salesRepId: "1",
      color: "bg-blue-100 text-blue-700 border-blue-300"
    },
    {
      id: 2,
      title: "Project Review",
      start: addDays(monthStart, 19),
      end: addDays(monthStart, 19),
      location: "Meeting Room B",
      description: "Monthly project status review",
      client: "Internal",
      salesRepId: "2",
      color: "bg-red-100 text-red-700 border-red-300"
    }
  ];

  const filteredEvents = events.filter(event => selectedReps.includes(event.salesRepId));

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
  };

  const handleEventClick = (event: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
  };

  return (
    <>
      <div className="grid grid-cols-7 border-l border-t">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="h-10 border-b border-r px-2 py-1 text-sm font-medium"
          >
            {day}
          </div>
        ))}
        
        {days.map((day) => {
          const dayEvents = filteredEvents.filter((event) => isSameDay(event.start, day));
          const hasEvents = dayEvents.length > 0;
          
          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[120px] border-b border-r p-1 cursor-pointer transition-colors",
                {
                  "bg-muted/50": isSameDay(day, new Date()),
                  "text-muted-foreground": !isSameMonth(day, date),
                  "hover:bg-accent/50": !hasEvents,
                }
              )}
              onClick={() => handleDayClick(day)}
            >
              <div className={cn(
                "text-sm font-medium",
                hasEvents ? "text-current" : ""
              )}>
                {format(day, "d")}
              </div>
              <div className="mt-1 space-y-1">
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "text-xs font-medium p-1 rounded cursor-pointer",
                      event.color
                    )}
                    onClick={(e) => handleEventClick(event, e)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <NewEventDialog
          isOpen={!!selectedDate}
          onClose={() => setSelectedDate(null)}
          selectedDate={selectedDate}
          salesReps={salesReps}
        />
      )}

      <EventDetailDialog
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onEdit={(event) => {
          console.log('Edit event:', event);
          setSelectedEvent(null);
        }}
      />
    </>
  );
}