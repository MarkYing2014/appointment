"use client";

import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, addHours, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { NewEventDialog } from "./new-event-dialog";
import { EventDetailDialog } from "./event-detail-dialog";
import { SalesRep } from "@/types/sales-rep";

interface WeekViewProps {
  date: Date;
  selectedReps: string[];
  salesReps: SalesRep[];
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function WeekView({ date, selectedReps, salesReps }: WeekViewProps) {
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  const weekStart = startOfWeek(date);
  const weekEnd = endOfWeek(date);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  const events = [
    {
      id: 1,
      title: "Team Meeting",
      start: addHours(startOfDay(days[1]), 10),
      end: addHours(startOfDay(days[1]), 11),
      location: "Conference Room A",
      description: "Weekly team sync meeting",
      client: "Internal",
      salesRepId: "1",
      color: "bg-blue-100 text-blue-700 border-blue-300"
    },
    {
      id: 2,
      title: "Lunch Break",
      start: addHours(startOfDay(days[3]), 12),
      end: addHours(startOfDay(days[3]), 13),
      location: "Cafeteria",
      description: "Team lunch discussion",
      client: "Internal",
      salesRepId: "2",
      color: "bg-red-100 text-red-700 border-red-300"
    }
  ];

  const filteredEvents = events.filter(event => selectedReps.includes(event.salesRepId));

  const handleTimeSlotClick = (day: Date, hour: number) => {
    setSelectedSlot({
      date: day,
      time: `${hour.toString().padStart(2, '0')}:00`
    });
  };

  const handleEventClick = (event: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEvent(event);
  };

  return (
    <>
      <div className="flex h-full">
        {/* Time labels */}
        <div className="w-16 flex-none border-r bg-background">
          <div className="sticky top-0 z-30 h-10 border-b bg-background" />
          <div className="space-y-[47px]">
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="relative h-12 text-right pr-2 text-sm text-muted-foreground"
              >
                {format(new Date().setHours(hour), "ha")}
              </div>
            ))}
          </div>
        </div>

        {/* Days */}
        <div className="flex flex-1">
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={cn("flex-1 border-r", {
                "bg-muted/50": isSameDay(day, new Date()),
              })}
            >
              {/* Day header */}
              <div className="sticky top-0 z-30 bg-background">
                <div className="h-10 border-b px-2 py-1">
                  <div className="text-sm font-medium">{format(day, "EEE")}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(day, "d")}
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="relative">
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="h-12 border-b hover:bg-accent/50 cursor-pointer"
                    onClick={() => handleTimeSlotClick(day, hour)}
                  />
                ))}

                {/* Events */}
                {filteredEvents.map((event) => {
                  if (!isSameDay(event.start, day)) return null;

                  const top = event.start.getHours() * 48 + event.start.getMinutes() * 0.8;
                  const duration = (event.end.getTime() - event.start.getTime()) / (1000 * 60 * 60);
                  const height = duration * 48;

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "absolute left-1 right-1 rounded-md border p-1 text-xs cursor-pointer",
                        event.color
                      )}
                      style={{ top: `${top}px`, height: `${height}px` }}
                      onClick={(e) => handleEventClick(event, e)}
                    >
                      {event.title}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedSlot && (
        <NewEventDialog
          isOpen={!!selectedSlot}
          onClose={() => setSelectedSlot(null)}
          selectedDate={selectedSlot.date}
          selectedTime={selectedSlot.time}
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