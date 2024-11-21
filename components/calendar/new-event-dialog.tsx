"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SalesRep } from "@/types/sales-rep";
import { useAppointments } from "@/hooks/use-appointments";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  selectedTime?: string;
  salesReps?: SalesRep[];
}

export function NewEventDialog({ 
  isOpen, 
  onClose, 
  selectedDate, 
  selectedTime,
  salesReps = []
}: NewEventDialogProps) {
  const { createAppointment } = useAppointments();
  const [formData, setFormData] = useState({
    title: "",
    date: format(selectedDate, "yyyy-MM-dd"),
    startTime: selectedTime || "09:00",
    endTime: selectedTime ? format(new Date(selectedDate.setHours(parseInt(selectedTime) + 1)), "HH:mm") : "10:00",
    location: "",
    description: "",
    salesRepId: "",
    clientId: "1" // Demo purpose
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const startDateTime = new Date(`${formData.date}T${formData.startTime}`);
      const endDateTime = new Date(`${formData.date}T${formData.endTime}`);
      
      await createAppointment({
        title: formData.title,
        startTime: startDateTime,
        endTime: endDateTime,
        location: formData.location,
        description: formData.description,
        salesRepId: formData.salesRepId,
        clientId: formData.clientId
      });
      
      onClose();
    } catch (error) {
      console.error('创建预约失败:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>创建新预约</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">预约标题</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="与客户会面"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">日期</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">开始时间</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">结束时间</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salesRep">销售代表</Label>
            <Select
              value={formData.salesRepId}
              onValueChange={(value) => setFormData({ ...formData, salesRepId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择销售代表" />
              </SelectTrigger>
              <SelectContent>
                {salesReps.map((rep) => (
                  <SelectItem 
                    key={rep.id} 
                    value={rep.id}
                    className="flex items-center gap-2"
                  >
                    <span>{rep.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({rep.availability === 'available' ? '空闲' : 
                        rep.availability === 'busy' ? '忙碌' : '待定'})
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">地点</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="办公室或线上会议"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">描述</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="添加描述..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button type="submit">
              创建预约
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}