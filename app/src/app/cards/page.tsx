"use client";

import {
  CreditCard,
  Plus,
  Star,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  mockCards,
  mockBenefits,
  mockOffers,
  formatCurrency,
  formatPoints,
} from "@/lib/mock-data";

export default function CardsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto page-enter">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary" />
            My Cards
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your credit card portfolio and view rewards details
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Card
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockCards.map((card) => {
          const cardBenefits = mockBenefits.filter(
            (b) => b.cardId === card.id
          );
          const cardOffers = mockOffers.filter((o) => o.cardId === card.id);
          const unusedCredits = cardBenefits.filter(
            (b) => !b.used && b.value > 0
          );
          const totalUnusedValue = unusedCredits.reduce(
            (sum, b) => sum + b.value,
            0
          );

          return (
            <Card
              key={card.id}
              className="glass-card border-border/30 overflow-hidden group"
            >
              {/* Card Visual */}
              <div
                className="credit-card-visual"
                style={{ background: card.color }}
              >
                <div className="flex justify-between items-start relative z-10">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 font-medium">
                      {card.issuer}
                    </p>
                    <p className="text-lg font-bold text-white mt-0.5">
                      {card.cardName}
                    </p>
                  </div>
                  {card.activeOffers > 0 && (
                    <Badge className="bg-white/20 text-white border-0 text-[10px] backdrop-blur-sm">
                      {card.activeOffers} offers
                    </Badge>
                  )}
                </div>
                <div className="mt-8 flex items-end justify-between relative z-10">
                  <div>
                    <p className="text-[10px] text-white/50 uppercase">
                      •••• •••• •••• 4242
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/50">Annual Fee</p>
                    <p className="text-sm font-semibold text-white">
                      {card.annualFee === 0
                        ? "FREE"
                        : formatCurrency(card.annualFee)}
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="p-5 space-y-4">
                {/* Balances */}
                <div className="flex gap-4">
                  {card.pointsBalance > 0 && (
                    <div className="flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        Points
                      </p>
                      <p className="text-xl font-bold">
                        {formatPoints(card.pointsBalance)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        ~{formatCurrency(card.pointsBalance * 0.018)} value
                      </p>
                    </div>
                  )}
                  {card.cashbackBalance > 0 && (
                    <div className="flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        Cash Back
                      </p>
                      <p className="text-xl font-bold">
                        {formatCurrency(card.cashbackBalance)}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Available
                      </p>
                    </div>
                  )}
                  {totalUnusedValue > 0 && (
                    <div className="flex-1">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                        Unused Credits
                      </p>
                      <p className="text-xl font-bold text-amber-400">
                        {formatCurrency(totalUnusedValue)}
                      </p>
                      <p className="text-[10px] text-amber-400/70">
                        Use before expiry
                      </p>
                    </div>
                  )}
                </div>

                <Separator className="bg-border/20" />

                {/* Reward Multipliers */}
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                    Reward Multipliers
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {card.multipliers.map((m, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-[10px] bg-primary/10 text-primary border-0 gap-1"
                      >
                        <Star className="w-2.5 h-2.5" />
                        {m.pointsPer} — {m.category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Benefits summary */}
                {cardBenefits.length > 0 && (
                  <>
                    <Separator className="bg-border/20" />
                    <div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                        Active Benefits
                      </p>
                      <div className="space-y-1.5">
                        {cardBenefits.slice(0, 3).map((benefit) => (
                          <div
                            key={benefit.id}
                            className="flex items-center justify-between text-xs"
                          >
                            <span className="text-muted-foreground">
                              {benefit.description}
                            </span>
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
                        ))}
                        {cardBenefits.length > 3 && (
                          <p className="text-[10px] text-primary">
                            +{cardBenefits.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />
                    Synced today
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-primary gap-1 h-7"
                  >
                    Details <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Add Card CTA */}
        <Card className="glass-card border-border/30 border-dashed flex items-center justify-center min-h-[400px] hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
              <Plus className="w-7 h-7 text-primary" />
            </div>
            <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              Connect a Card
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Via Plaid secure link
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
