"use client";

import { Settings, User, Bell, Shield, Link2, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlaidLinkButton } from "@/components/plaid-link";

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[800px] mx-auto page-enter">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Full Name
                </label>
                <Input
                  defaultValue="Alex Johnson"
                  className="bg-accent/30 border-border/30"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">
                  Email
                </label>
                <Input
                  defaultValue="alex@example.com"
                  className="bg-accent/30 border-border/30"
                />
              </div>
            </div>
            <Button size="sm" className="text-xs">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                label: "Expiring Offers",
                desc: "Get notified when offers are about to expire",
                enabled: true,
              },
              {
                label: "Unused Monthly Credits",
                desc: "Reminder to use monthly credits before they reset",
                enabled: true,
              },
              {
                label: "New Promotions",
                desc: "Be notified of new merchant offers",
                enabled: true,
              },
              {
                label: "Optimization Opportunities",
                desc: "Suggestions to improve card usage",
                enabled: false,
              },
              {
                label: "Weekly Summary",
                desc: "Weekly email with spending and rewards overview",
                enabled: true,
              },
            ].map((pref) => (
              <div
                key={pref.label}
                className="flex items-center justify-between p-3 rounded-xl bg-accent/20"
              >
                <div>
                  <p className="text-sm font-medium">{pref.label}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {pref.desc}
                  </p>
                </div>
                <Button
                  variant={pref.enabled ? "default" : "outline"}
                  size="sm"
                  className="text-xs h-7 min-w-[60px]"
                >
                  {pref.enabled ? "On" : "Off"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Link2 className="w-4 h-4 text-primary" />
              Integrations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-accent/20">
              <div>
                <p className="text-sm font-medium">Plaid</p>
                <p className="text-[10px] text-muted-foreground">
                  Bank account & card connections
                </p>
              </div>
              <PlaidLinkButton />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-accent/20">
              <div>
                <p className="text-sm font-medium">Email Provider</p>
                <p className="text-[10px] text-muted-foreground">
                  For notification delivery
                </p>
              </div>
              <Badge className="text-[10px] bg-muted text-muted-foreground border-0">
                Not configured
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="glass-card border-border/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-accent/20">
              <div>
                <p className="text-sm font-medium">Change Password</p>
                <p className="text-[10px] text-muted-foreground">
                  Last changed 30 days ago
                </p>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-7">
                Update
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-accent/20">
              <div>
                <p className="text-sm font-medium">Two-Factor Authentication</p>
                <p className="text-[10px] text-muted-foreground">
                  Extra security for your account
                </p>
              </div>
              <Badge className="text-[10px] bg-chart-2/15 text-chart-2 border-0">
                Enabled
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-accent/20">
              <div>
                <p className="text-sm font-medium">Active Sessions</p>
                <p className="text-[10px] text-muted-foreground">
                  Manage your active sessions
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7 text-muted-foreground">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
