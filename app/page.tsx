"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentDetails } from "@/components/appointments/appointment-details";
import { MainLayout } from "@/components/layout/main-layout";
import { NewEventDialog } from "@/components/calendar/new-event-dialog";
import { cn } from "@/lib/utils";

const mockSalesReps = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    phone: "+1234567890",
    territory: "北区",
    availability: "available",
    workingHours: { start: "09:00", end: "17:00" },
    notificationPreferences: { email: true, sms: true, app: true }
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@example.com",
    phone: "+1234567891",
    territory: "南区",
    availability: "busy",
    workingHours: { start: "08:00", end: "16:00" },
    notificationPreferences: { email: true, sms: false, app: true }
  }
];

export default function Home() {
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const upcomingAppointments = [
    {
      id: 1,
      clientName: "王五",
      date: "2024年3月21日",
      time: "14:30",
      duration: "1小时",
      location: "主办公室",
      notes: "跟进咨询"
    },
    {
      id: 2,
      clientName: "陈明",
      date: "2024年3月21日",
      time: "16:00",
      duration: "30分钟",
      location: "线上会议",
      notes: "初次咨询"
    },
    {
      id: 3,
      clientName: "林小红",
      date: "2024年3月22日",
      time: "10:00",
      duration: "1小时",
      location: "主办公室",
      notes: "定期检查"
    }
  ];

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">仪表盘</h1>
          <Button onClick={() => setIsNewEventDialogOpen(true)}>新建预约</Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="bg-blue-50 dark:bg-blue-950/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                总预约数
              </CardTitle>
              <Calendar className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">12</div>
              <p className="text-xs text-blue-600/80 dark:text-blue-400">
                较上周增加2个
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-950/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                活跃客户
              </CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">24</div>
              <p className="text-xs text-green-600/80 dark:text-green-400">
                本月新增4位
              </p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 dark:bg-purple-950/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                今日预约
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">3</div>
              <p className="text-xs text-purple-600/80 dark:text-purple-400">
                下一个在14:30
              </p>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-950/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                待处理事项
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">2</div>
              <p className="text-xs text-amber-600/80 dark:text-amber-400">
                需要关注
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>即将到来的预约</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div>
                      <p className="font-medium">{appointment.clientName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.time} - {appointment.duration}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      查看
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>最近活动</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium">预约已完成</p>
                      <p className="text-sm text-muted-foreground">客户{i + 1} - 1小时前</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedAppointment && (
          <AppointmentDetails
            isOpen={!!selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
            appointment={selectedAppointment}
          />
        )}

        <NewEventDialog
          isOpen={isNewEventDialogOpen}
          onClose={() => setIsNewEventDialogOpen(false)}
          selectedDate={new Date()}
          salesReps={mockSalesReps}
        />
      </div>
    </MainLayout>
  );
}