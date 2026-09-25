"use client";

import {
  Bell,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Gift,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const notifications = [
  {
    id: "n1",
    type: "expiring",
    icon: Clock,
    title: "DoorDash offer expires tomorrow",
    description: "Chase Sapphire 5% back on DoorDash — activate before Sep 26",
    time: "2 hours ago",
    read: false,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "n2",
    type: "action",
    icon: Gift,
    title: "New Amex Offer: Lululemon $20 back",
    description: "Spend $100 at Lululemon, get $20 back on your Amex Gold",
    time: "5 hours ago",
    read: false,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "n3",
    type: "optimization",
    icon: TrendingUp,
    title: "Streaming subscriptions can be optimized",
    description: "Move Netflix and Spotify to Amex BCP for 6% cash back",
    time: "Yesterday",
    read: false,
    iconColor: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    id: "n4",
    type: "expiring",
    icon: AlertTriangle,
    title: "Dining credit expires in 6 days",
    description: "$10 Amex Gold dining credit — use at any restaurant",
    time: "Yesterday",
    read: true,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
  },
  {
    id: "n5",
    type: "action",
    icon: CheckCircle2,
    title: "Whole Foods offer activated successfully",
    description: "$15 back on $75 spend — valid through Sep 28",
    time: "2 days ago",
    read: true,
    iconColor: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
];

export default function NotificationsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[800px] mx-auto page-enter">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Bell className="w-6 h-6 text-primary" />
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1">
            Stay on top of your rewards opportunities
          </p>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          Mark all read
        </Button>
      </div>

      <div className="space-y-2">
        {notifications.map((notif, i) => {
          const Icon = notif.icon;
          return (
            <div key={notif.id}>
              <Card
                className={`glass-card border-border/30 transition-all hover:border-border/60 ${
                  !notif.read ? "border-l-2 border-l-primary" : "opacity-70"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${notif.bgColor} flex items-center justify-center shrink-0`}
                    >
                      <Icon className={`w-5 h-5 ${notif.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={`text-sm ${
                            notif.read
                              ? "text-muted-foreground"
                              : "font-semibold"
                          }`}
                        >
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {notif.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1.5">
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
