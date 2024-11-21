"use client";

import { useState } from "react";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { CalendarViewSelector } from "@/components/calendar/view-selector";
import { WeekView } from "@/components/calendar/week-view";
import { MonthView } from "@/components/calendar/month-view";
import { RepSelector } from "@/components/sales/rep-selector";
import { SalesRep } from "@/types/sales-rep";
import { MainLayout } from "@/components/layout/main-layout";
import { NewEventDialog } from "@/components/calendar/new-event-dialog";

const mockSalesReps: SalesRep[] = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    phone: "+86 123 4567 890",
    territory: "北区",
    availability: "available",
    workingHours: { start: "09:00", end: "17:00" },
    notificationPreferences: { email: true, sms: true, app: true }
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@example.com",
    phone: "+86 123 4567 891",
    territory: "南区",
    availability: "busy",
    workingHours: { start: "08:00", end: "16:00" },
    notificationPreferences: { email: true, sms: false, app: true }
  },
  {
    id: "3",
    name: "王五",
    email: "wangwu@example.com",
    phone: "+86 123 4567 892",
    territory: "东区",
    availability: "tentative",
    workingHours: { start: "10:00", end: "18:00" },
    notificationPreferences: { email: true, sms: true, app: false }
  }
];

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<"week" | "month">("week");
  const [selectedReps, setSelectedReps] = useState<string[]>([]);
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);

  const navigateToToday = () => setDate(new Date());
  
  const navigatePrevious = () => {
    if (view === "week") {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() - 7);
      setDate(newDate);
    } else {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      setDate(newDate);
    }
  };

  const navigateNext = () => {
    if (view === "week") {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + 7);
      setDate(newDate);
    } else {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      setDate(newDate);
    }
  };

  return (
    <MainLayout>
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={navigateToToday}>
              今天
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-xl font-semibold">
              {view === "week" 
                ? `${format(startOfWeek(date), 'MMM d')} - ${format(endOfWeek(date), 'MMM d, yyyy')}`
                : format(date, 'yyyy年M月')}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <RepSelector
              salesReps={mockSalesReps}
              selectedReps={selectedReps}
              onSelectionChange={setSelectedReps}
            />
            <CalendarViewSelector view={view} onViewChange={setView} />
            <Button onClick={() => setIsNewEventDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> 新建预约
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          {view === "week" ? (
            <WeekView 
              date={date}
              selectedReps={selectedReps.length > 0 ? selectedReps : mockSalesReps.map(rep => rep.id)}
              salesReps={mockSalesReps}
            />
          ) : (
            <MonthView 
              date={date}
              selectedReps={selectedReps.length > 0 ? selectedReps : mockSalesReps.map(rep => rep.id)}
              salesReps={mockSalesReps}
            />
          )}
        </div>

        <NewEventDialog
          isOpen={isNewEventDialogOpen}
          onClose={() => setIsNewEventDialogOpen(false)}
          selectedDate={date}
          salesReps={mockSalesReps}
        />
      </div>
    </MainLayout>
  );
}