"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddClientDialog } from "@/components/clients/add-client-dialog";
import { MainLayout } from "@/components/layout/main-layout";

export default function ClientsPage() {
  const clients = [
    {
      id: 1,
      name: "张三",
      email: "zhangsan@example.com",
      phone: "+86 123 4567 890",
      appointments: 5
    },
    {
      id: 2,
      name: "李四",
      email: "lisi@example.com",
      phone: "+86 123 4567 891",
      appointments: 3
    },
    {
      id: 3,
      name: "王五",
      email: "wangwu@example.com",
      phone: "+86 123 4567 892",
      appointments: 8
    }
  ];

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">客户管理</h1>
          <AddClientDialog />
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索客户..." className="pl-8" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>客户列表</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{client.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {client.phone}
                      </div>
                    </div>
                    <div className="text-sm">
                      {client.appointments} 个预约
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">查看历史</Button>
                    <Button variant="outline" size="sm">编辑</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}