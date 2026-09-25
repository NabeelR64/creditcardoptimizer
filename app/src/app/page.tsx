"use client";

import {
  CreditCard,
  TrendingUp,
  AlertTriangle,
  Gift,
  DollarSign,
  Zap,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  mockCards,
  mockRecommendations,
  mockTransactions,
  mockBenefits,
  mockSpendingCategories,
  monthlySpending,
  getPortfolioTotals,
  formatCurrency,
  formatPoints,
  getCardDisplayName,
  getDaysUntil,
} from "@/lib/mock-data";

const urgencyColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-primary/15 text-primary",
  high: "bg-amber-500/15 text-amber-400",
  critical: "bg-red-500/15 text-red-400",
};

const urgencyDots = {
  low: "bg-muted-foreground",
  medium: "bg-primary",
  high: "bg-amber-400",
  critical: "bg-red-400 pulse-dot",
};

export default function DashboardPage() {
  const totals = getPortfolioTotals();
  const recentTransactions = mockTransactions.slice(0, 5);
  const criticalRecs = mockRecommendations
    .filter((r) => r.urgency === "critical" || r.urgency === "high")
    .slice(0, 4);
  const unusedBenefits = mockBenefits.filter((b) => !b.used && b.value > 0);
  const optimizationScore = Math.round(
    (mockSpendingCategories.filter((s) => s.optimized).length /
      mockSpendingCategories.length) *
      100
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto page-enter">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Good evening 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s your rewards portfolio overview
          </p>
        </div>
        <Link href="/advisor">
          <Button className="gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all">
            <Sparkles className="w-4 h-4" />
            Ask AI Advisor
          </Button>
        </Link>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Cards
              </span>
            </div>
            <p className="text-3xl font-bold">{totals.totalCards}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Active in portfolio
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-chart-2/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-chart-2" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Points
              </span>
            </div>
            <p className="text-3xl font-bold">
              {formatPoints(totals.totalPoints)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ~{formatCurrency(totals.totalPoints * 0.018)} estimated value
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-chart-3" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Cash Back
              </span>
            </div>
            <p className="text-3xl font-bold">
              {formatCurrency(totals.totalCashback)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Available to redeem
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-chart-5/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-chart-5" />
              </div>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Offers
              </span>
            </div>
            <p className="text-3xl font-bold">{totals.totalOffers}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {totals.totalExpiring} expiring soon
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column — Action Center + Recommendations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Action Center */}
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Action Center
                </CardTitle>
                <Badge variant="outline" className="text-xs border-amber-400/30 text-amber-400">
                  {criticalRecs.length} actions needed
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {criticalRecs.map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors group"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${urgencyDots[rec.urgency]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{rec.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {rec.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {rec.estimatedValue && (
                      <Badge className={`text-[10px] ${urgencyColors[rec.urgency]}`}>
                        {formatCurrency(rec.estimatedValue)}
                      </Badge>
                    )}
                    {rec.actionLabel && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {rec.actionLabel}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Link href="/offers" className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 mt-2 transition-colors">
                View all recommendations <ChevronRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Optimization Score */}
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-chart-2" />
                Optimization Score
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex items-end gap-4">
                <span className="text-5xl font-bold gradient-text">
                  {optimizationScore}%
                </span>
                <span className="text-sm text-muted-foreground mb-2">
                  of spending is on optimal cards
                </span>
              </div>
              <Progress value={optimizationScore} className="h-2" />
              <div className="grid grid-cols-2 gap-3 mt-4">
                {mockSpendingCategories.slice(0, 4).map((cat) => (
                  <div
                    key={cat.category}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-accent/20"
                  >
                    <div>
                      <p className="text-xs font-medium">{cat.category}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {cat.bestCard}
                      </p>
                    </div>
                    {cat.optimized ? (
                      <Badge className="text-[9px] bg-chart-2/15 text-chart-2 border-0">
                        ✓ Optimized
                      </Badge>
                    ) : (
                      <Badge className="text-[9px] bg-amber-500/15 text-amber-400 border-0">
                        Can improve
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <Link href="/transactions" className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors">
                View spending analysis <ChevronRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  Recent Transactions
                </CardTitle>
                <Link href="/transactions">
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                    View all <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {recentTransactions.map((tx, i) => (
                  <div key={tx.id}>
                    <div className="flex items-center justify-between py-2.5 group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/50 flex items-center justify-center text-sm">
                          {tx.category === "Groceries"
                            ? "🛒"
                            : tx.category === "Restaurants"
                            ? "🍽️"
                            : tx.category === "Gas"
                            ? "⛽"
                            : tx.category === "Streaming"
                            ? "📺"
                            : tx.category === "Flights"
                            ? "✈️"
                            : tx.category === "Hotels"
                            ? "🏨"
                            : tx.category === "Shopping"
                            ? "🛍️"
                            : tx.category === "Dining"
                            ? "🍔"
                            : "💳"}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{tx.merchant}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {getCardDisplayName(tx.cardId)} · {tx.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {formatCurrency(tx.amount)}
                        </p>
                        {tx.missedReward ? (
                          <p className="text-[10px] text-amber-400">
                            -{formatCurrency(tx.missedReward)} missed
                          </p>
                        ) : (
                          <p className="text-[10px] text-chart-2">✓ Optimal</p>
                        )}
                      </div>
                    </div>
                    {i < recentTransactions.length - 1 && (
                      <Separator className="bg-border/20" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Expiring Credits */}
          <Card className="glass-card border-border/30 glow-warning">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Credits Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {unusedBenefits.slice(0, 4).map((benefit) => {
                const daysLeft = getDaysUntil(benefit.endDate);
                return (
                  <div
                    key={benefit.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-accent/20 hover:bg-accent/40 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {benefit.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {getCardDisplayName(benefit.cardId)}
                      </p>
                    </div>
                    <div className="text-right">
                      {benefit.value > 0 && (
                        <p className="text-sm font-semibold text-amber-400">
                          {formatCurrency(benefit.value)}
                        </p>
                      )}
                      <p
                        className={`text-[10px] ${
                          daysLeft <= 7
                            ? "text-red-400"
                            : "text-muted-foreground"
                        }`}
                      >
                        {daysLeft > 0 ? `${daysLeft}d left` : "Expired"}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="pt-1 text-center">
                <p className="text-xs text-muted-foreground">
                  <span className="text-amber-400 font-semibold">
                    {formatCurrency(totals.totalCreditsAvailable)}
                  </span>{" "}
                  in unused credits
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Spending Trend */}
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Monthly Spending
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {monthlySpending.map((m) => {
                  const max = Math.max(...monthlySpending.map((s) => s.amount));
                  const pct = (m.amount / max) * 100;
                  return (
                    <div key={m.month} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-8">
                        {m.month}
                      </span>
                      <div className="flex-1 h-6 rounded-md bg-accent/20 overflow-hidden">
                        <div
                          className="h-full rounded-md bg-primary/30 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium w-16 text-right">
                        {formatCurrency(m.amount)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Card Portfolio Mini */}
          <Card className="glass-card border-border/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">
                  Portfolio
                </CardTitle>
                <Link href="/cards">
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                    Manage <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              {mockCards.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-accent/30 transition-colors"
                >
                  <div
                    className="w-10 h-7 rounded-md shrink-0"
                    style={{ background: card.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {card.issuer} {card.cardName}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {card.pointsBalance > 0
                        ? `${formatPoints(card.pointsBalance)} pts`
                        : formatCurrency(card.cashbackBalance)}
                    </p>
                  </div>
                  {card.expiringBenefits > 0 && (
                    <Badge className="text-[9px] bg-amber-500/15 text-amber-400 border-0">
                      {card.expiringBenefits} expiring
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Missed Rewards Summary */}
          {totals.missedRewards > 0 && (
            <Card className="glass-card border-border/30 border-amber-500/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-semibold">
                    Missed Rewards This Month
                  </span>
                </div>
                <p className="text-2xl font-bold text-amber-400">
                  {formatCurrency(totals.missedRewards)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  in suboptimal card usage detected
                </p>
                <Link href="/transactions">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 text-xs text-amber-400 hover:text-amber-300 gap-1 px-0"
                  >
                    View details <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
