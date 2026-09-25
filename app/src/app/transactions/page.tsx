"use client";

import { useState } from "react";
import {
  ArrowLeftRight,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Search,
  Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  mockTransactions,
  mockSpendingCategories,
  getCardDisplayName,
  getCardById,
  formatCurrency,
  formatPoints,
} from "@/lib/mock-data";

const categoryEmoji: Record<string, string> = {
  Groceries: "🛒",
  Restaurants: "🍽️",
  Gas: "⛽",
  Streaming: "📺",
  Flights: "✈️",
  Hotels: "🏨",
  Shopping: "🛍️",
  Dining: "🍔",
  Travel: "🌍",
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "optimal" | "suboptimal">("all");

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" ||
      (filterType === "optimal" && !tx.missedReward) ||
      (filterType === "suboptimal" && tx.missedReward);
    return matchesSearch && matchesFilter;
  });

  const totalSpent = mockTransactions.reduce((sum, tx) => sum + tx.amount, 0);
  const missedTransactions = mockTransactions.filter((tx) => tx.missedReward);
  const totalMissed = missedTransactions.reduce(
    (sum, tx) => sum + (tx.missedReward || 0),
    0
  );
  const optimalPercentage = Math.round(
    ((mockTransactions.length - missedTransactions.length) /
      mockTransactions.length) *
      100
  );

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto page-enter">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <ArrowLeftRight className="w-6 h-6 text-primary" />
            Transactions
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor spending and detect missed reward opportunities
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowLeftRight className="w-4 h-4 text-primary" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Transactions
              </span>
            </div>
            <p className="text-2xl font-bold">{mockTransactions.length}</p>
            <p className="text-[10px] text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-chart-2" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Total Spent
              </span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
            <p className="text-[10px] text-muted-foreground">Across all cards</p>
          </CardContent>
        </Card>
        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-chart-2" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Optimal Usage
              </span>
            </div>
            <p className="text-2xl font-bold text-chart-2">
              {optimalPercentage}%
            </p>
            <p className="text-[10px] text-muted-foreground">
              On best card
            </p>
          </CardContent>
        </Card>
        <Card className="stat-card glass-card border-border/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Missed Rewards
              </span>
            </div>
            <p className="text-2xl font-bold text-amber-400">
              {formatCurrency(totalMissed)}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {missedTransactions.length} transactions
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="bg-accent/30 border border-border/30">
          <TabsTrigger value="transactions">All Transactions</TabsTrigger>
          <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
          <TabsTrigger value="missed">Missed Rewards</TabsTrigger>
        </TabsList>

        {/* All Transactions */}
        <TabsContent value="transactions" className="space-y-4">
          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-accent/30 border-border/30 h-9"
              />
            </div>
            <div className="flex gap-1">
              {(["all", "optimal", "suboptimal"] as const).map((f) => (
                <Button
                  key={f}
                  variant={filterType === f ? "default" : "ghost"}
                  size="sm"
                  className={`text-xs h-8 ${
                    filterType === f ? "" : "text-muted-foreground"
                  }`}
                  onClick={() => setFilterType(f)}
                >
                  {f === "all"
                    ? "All"
                    : f === "optimal"
                    ? "✓ Optimal"
                    : "⚠ Suboptimal"}
                </Button>
              ))}
            </div>
          </div>

          {/* Transaction List */}
          <Card className="glass-card border-border/30">
            <CardContent className="p-0">
              {filteredTransactions.map((tx, i) => (
                <div key={tx.id}>
                  <div className="flex items-center justify-between px-5 py-3.5 hover:bg-accent/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/50 flex items-center justify-center text-lg">
                        {categoryEmoji[tx.category] || "💳"}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{tx.merchant}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <div
                            className="w-3 h-2 rounded-sm shrink-0"
                            style={{
                              background:
                                getCardById(tx.cardId)?.color || "#333",
                            }}
                          />
                          <p className="text-[10px] text-muted-foreground">
                            {getCardDisplayName(tx.cardId)}
                          </p>
                          <span className="text-[10px] text-muted-foreground">
                            ·
                          </span>
                          <p className="text-[10px] text-muted-foreground">
                            {tx.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {formatCurrency(tx.amount)}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {new Date(tx.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      {tx.missedReward ? (
                        <div className="flex items-center gap-1.5 min-w-[120px]">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <div>
                            <p className="text-[10px] text-amber-400 font-medium">
                              -{formatCurrency(tx.missedReward)} missed
                            </p>
                            <p className="text-[9px] text-muted-foreground">
                              Use {getCardDisplayName(tx.optimalCard || "")}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 min-w-[120px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-chart-2 shrink-0" />
                          <p className="text-[10px] text-chart-2">
                            Optimal card
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {i < filteredTransactions.length - 1 && (
                    <Separator className="bg-border/10 mx-5" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spending Analysis */}
        <TabsContent value="spending" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {mockSpendingCategories.map((cat) => (
              <Card
                key={cat.category}
                className={`glass-card border-border/30 ${
                  !cat.optimized ? "border-amber-500/10" : ""
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {categoryEmoji[cat.category] || "💳"}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{cat.category}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {cat.percentage}% of total spend
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">
                      {formatCurrency(cat.amount)}
                    </p>
                  </div>

                  <div className="h-2 rounded-full bg-accent/30 overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all ${
                        cat.optimized ? "bg-chart-2" : "bg-amber-400"
                      }`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        Best Card
                      </p>
                      <p className="text-xs font-medium text-primary">
                        {cat.bestCard}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-muted-foreground">
                        Current
                      </p>
                      <p className="text-xs font-medium">{cat.currentCard}</p>
                    </div>
                    {cat.optimized ? (
                      <Badge className="text-[9px] bg-chart-2/15 text-chart-2 border-0">
                        ✓ Optimized
                      </Badge>
                    ) : (
                      <Badge className="text-[9px] bg-amber-500/15 text-amber-400 border-0">
                        Switch card →
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Missed Rewards */}
        <TabsContent value="missed" className="space-y-4">
          {/* Missed rewards summary */}
          <Card className="glass-card border-amber-500/20 glow-warning">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Missed Rewards This Period
                  </p>
                  <p className="text-3xl font-bold text-amber-400">
                    {formatCurrency(totalMissed)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Across {missedTransactions.length} transactions that could
                    have earned more rewards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Missed transaction details */}
          {missedTransactions.map((tx) => (
            <Card
              key={tx.id}
              className="glass-card border-border/30 hover:border-amber-500/20 transition-colors"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">
                      {categoryEmoji[tx.category] || "💳"}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{tx.merchant}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(tx.amount)} ·{" "}
                        {new Date(tx.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>

                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                          <div
                            className="w-6 h-4 rounded-sm"
                            style={{
                              background:
                                getCardById(tx.cardId)?.color || "#333",
                            }}
                          />
                          <div>
                            <p className="text-[10px] text-red-400/70">Used</p>
                            <p className="text-xs font-medium">
                              {getCardDisplayName(tx.cardId)}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-muted-foreground" />

                        <div className="flex items-center gap-2 p-2 rounded-lg bg-chart-2/5 border border-chart-2/10">
                          <div
                            className="w-6 h-4 rounded-sm"
                            style={{
                              background:
                                getCardById(tx.optimalCard || "")?.color ||
                                "#333",
                            }}
                          />
                          <div>
                            <p className="text-[10px] text-chart-2/70">
                              Should use
                            </p>
                            <p className="text-xs font-medium">
                              {getCardDisplayName(tx.optimalCard || "")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Badge className="text-xs bg-amber-500/15 text-amber-400 border-0">
                    -{formatCurrency(tx.missedReward || 0)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
