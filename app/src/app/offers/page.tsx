"use client";

import { useState } from "react";
import {
  Tag,
  Clock,
  CheckCircle2,
  Filter,
  Gift,
  Plane,
  ShoppingBag,
  Utensils,
  Fuel,
  Tv,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  mockOffers,
  mockBenefits,
  mockRecommendations,
  getCardDisplayName,
  formatCurrency,
  getDaysUntil,
} from "@/lib/mock-data";

const categoryIcons: Record<string, React.ReactNode> = {
  Groceries: <ShoppingBag className="w-4 h-4" />,
  Dining: <Utensils className="w-4 h-4" />,
  Travel: <Plane className="w-4 h-4" />,
  Gas: <Fuel className="w-4 h-4" />,
  Streaming: <Tv className="w-4 h-4" />,
  Shopping: <ShoppingBag className="w-4 h-4" />,
  Transit: <ShoppingBag className="w-4 h-4" />,
  Home: <ShoppingBag className="w-4 h-4" />,
  Electronics: <Tv className="w-4 h-4" />,
  Uber: <ShoppingBag className="w-4 h-4" />,
};

export default function OffersPage() {
  const [offersFilter, setOffersFilter] = useState<"all" | "activated" | "available">("all");

  const filteredOffers = mockOffers.filter((o) => {
    if (offersFilter === "activated") return o.activated;
    if (offersFilter === "available") return !o.activated;
    return true;
  });

  const totalOfferValue = mockOffers.reduce((sum, o) => sum + o.estimatedValue, 0);
  const activatedCount = mockOffers.filter((o) => o.activated).length;
  const expiringOffers = mockOffers.filter((o) => getDaysUntil(o.expirationDate) <= 7);

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto page-enter">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Tag className="w-6 h-6 text-primary" />
            Offers & Benefits
          </h1>
          <p className="text-muted-foreground mt-1">
            Track, activate, and redeem your card benefits
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Total Offers
              </span>
            </div>
            <p className="text-2xl font-bold">{mockOffers.length}</p>
          </CardContent>
        </Card>
        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-chart-2" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Activated
              </span>
            </div>
            <p className="text-2xl font-bold">{activatedCount}</p>
          </CardContent>
        </Card>
        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Expiring Soon
              </span>
            </div>
            <p className="text-2xl font-bold text-amber-400">
              {expiringOffers.length}
            </p>
          </CardContent>
        </Card>
        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-chart-3" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Total Value
              </span>
            </div>
            <p className="text-2xl font-bold">
              {formatCurrency(totalOfferValue)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="offers" className="space-y-6">
        <TabsList className="bg-accent/30 border border-border/30">
          <TabsTrigger value="offers">Merchant Offers</TabsTrigger>
          <TabsTrigger value="benefits">Credits & Benefits</TabsTrigger>
          <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
        </TabsList>

        {/* Offers Tab */}
        <TabsContent value="offers" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-1">
              {(["all", "available", "activated"] as const).map((f) => (
                <Button
                  key={f}
                  variant={offersFilter === f ? "default" : "ghost"}
                  size="sm"
                  className={`text-xs h-7 ${
                    offersFilter === f
                      ? ""
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setOffersFilter(f)}
                >
                  {f === "all"
                    ? "All"
                    : f === "available"
                    ? "Available"
                    : "Activated"}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredOffers.map((offer) => {
              const daysLeft = getDaysUntil(offer.expirationDate);
              const isExpiringSoon = daysLeft <= 7;

              return (
                <Card
                  key={offer.id}
                  className={`glass-card border-border/30 hover:border-border/60 transition-all group ${
                    isExpiringSoon && !offer.activated ? "glow-warning" : ""
                  }`}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-accent/50 flex items-center justify-center">
                          {categoryIcons[offer.category] || (
                            <Tag className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {offer.merchant}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {getCardDisplayName(offer.cardId)}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`text-[10px] border-0 ${
                          offer.activated
                            ? "bg-chart-2/15 text-chart-2"
                            : "bg-primary/15 text-primary"
                        }`}
                      >
                        {offer.activated ? "✓ Active" : "Available"}
                      </Badge>
                    </div>

                    <p className="text-sm text-foreground/90 mb-3">
                      {offer.offerDetails}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          {formatCurrency(offer.estimatedValue)}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          value
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] ${
                            isExpiringSoon
                              ? "text-amber-400 font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {daysLeft > 0
                            ? `${daysLeft}d left`
                            : "Expired"}
                        </span>
                        {!offer.activated && (
                          <Button
                            size="sm"
                            className="h-7 text-xs"
                          >
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Recurring Credits */}
            <Card className="glass-card border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Monthly Credits
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {mockBenefits
                  .filter((b) => b.benefitType === "recurring_credit")
                  .map((benefit) => (
                    <div
                      key={benefit.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-accent/20"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {benefit.description}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {getCardDisplayName(benefit.cardId)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {benefit.value > 0 && (
                          <span className="text-sm font-semibold">
                            {formatCurrency(benefit.value)}
                          </span>
                        )}
                        {benefit.used ? (
                          <Badge className="text-[9px] bg-chart-2/15 text-chart-2 border-0">
                            ✓ Used
                          </Badge>
                        ) : (
                          <Badge className="text-[9px] bg-amber-500/15 text-amber-400 border-0">
                            Unused
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Travel Benefits */}
            <Card className="glass-card border-border/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Plane className="w-4 h-4 text-primary" />
                  Travel Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {mockBenefits
                  .filter((b) => b.benefitType === "travel_benefit" || (b.benefitType === "recurring_credit" && b.category === "Travel"))
                  .map((benefit) => (
                    <div
                      key={benefit.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-accent/20"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {benefit.description}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {getCardDisplayName(benefit.cardId)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {benefit.value > 0 && (
                          <span className="text-sm font-semibold">
                            {formatCurrency(benefit.value)}
                          </span>
                        )}
                        {benefit.used ? (
                          <Badge className="text-[9px] bg-chart-2/15 text-chart-2 border-0">
                            ✓ Used
                          </Badge>
                        ) : benefit.value > 0 ? (
                          <Badge className="text-[9px] bg-amber-500/15 text-amber-400 border-0">
                            Unused
                          </Badge>
                        ) : (
                          <Badge className="text-[9px] bg-primary/15 text-primary border-0">
                            Available
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Rotating Categories */}
            <Card className="glass-card border-border/30 md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-chart-3" />
                  Rotating Category Bonuses
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {mockBenefits
                  .filter((b) => b.benefitType === "rotating_category")
                  .map((benefit) => (
                    <div
                      key={benefit.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-accent/20"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {benefit.description}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {getCardDisplayName(benefit.cardId)} · Ends{" "}
                          {benefit.endDate}
                        </p>
                      </div>
                      <Badge className="text-[10px] bg-chart-3/15 text-chart-3 border-0">
                        {getDaysUntil(benefit.endDate)}d remaining
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          {mockRecommendations.map((rec) => (
            <Card
              key={rec.id}
              className="glass-card border-border/30 hover:border-border/60 transition-all"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                      rec.urgency === "critical"
                        ? "bg-red-400 pulse-dot"
                        : rec.urgency === "high"
                        ? "bg-amber-400"
                        : rec.urgency === "medium"
                        ? "bg-primary"
                        : "bg-muted-foreground"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-semibold">{rec.title}</p>
                      {rec.estimatedValue && (
                        <Badge
                          className={`text-[10px] border-0 ml-2 shrink-0 ${
                            rec.urgency === "critical"
                              ? "bg-red-500/15 text-red-400"
                              : rec.urgency === "high"
                              ? "bg-amber-500/15 text-amber-400"
                              : "bg-primary/15 text-primary"
                          }`}
                        >
                          +{formatCurrency(rec.estimatedValue)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {rec.description}
                    </p>
                    {rec.actionLabel && (
                      <Button
                        size="sm"
                        className="mt-3 h-7 text-xs gap-1"
                      >
                        {rec.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
