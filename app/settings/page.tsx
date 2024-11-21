"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RepManagement } from "@/components/sales/rep-management";
import { Territory } from "@/types/sales-rep";
import { MainLayout } from "@/components/layout/main-layout";

const territories: Territory[] = [
  { id: "north", name: "北区", description: "北部区域" },
  { id: "south", name: "南区", description: "南部区域" },
  { id: "east", name: "东区", description: "东部区域" },
  { id: "west", name: "西区", description: "西部区域" }
];

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [reminderTime, setReminderTime] = useState(24);
  const [workingHours, setWorkingHours] = useState({
    start: "09:00",
    end: "17:00"
  });

  return (
    <MainLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">系统设置</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>通知设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">邮件通知</Label>
                  <p className="text-sm text-muted-foreground">
                    通过邮件接收预约提醒
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">短信通知</Label>
                  <p className="text-sm text-muted-foreground">
                    通过短信接收预约提醒
                  </p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>提醒时间</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">小时前提醒</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>工作时间</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>开始时间</Label>
                  <Input
                    type="time"
                    value={workingHours.start}
                    onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>结束时间</Label>
                  <Input
                    type="time"
                    value={workingHours.end}
                    onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>销售代表管理</CardTitle>
            </CardHeader>
            <CardContent>
              <RepManagement territories={territories} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>账户设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>邮箱地址</Label>
                <Input type="email" placeholder="zhangsan@example.com" />
              </div>
              <div className="space-y-2">
                <Label>手机号码</Label>
                <Input type="tel" placeholder="+86 123 4567 890" />
              </div>
              <Button>保存更改</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}