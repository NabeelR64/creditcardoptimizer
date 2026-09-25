// ─── Types ───────────────────────────────────────────────────────────────────

export interface CreditCard {
  id: string;
  issuer: string;
  cardName: string;
  annualFee: number;
  rewardProgram: string;
  pointsBalance: number;
  cashbackBalance: number;
  activeOffers: number;
  expiringBenefits: number;
  lastSynced: string;
  color: string; // gradient CSS
  logo: string; // emoji stand-in
  multipliers: CategoryMultiplier[];
}

export interface CategoryMultiplier {
  category: string;
  multiplier: number; // e.g. 4 = 4x
  pointsPer: string; // "4x MR points"
}

export interface Benefit {
  id: string;
  cardId: string;
  benefitType: "recurring_credit" | "rotating_category" | "merchant_offer" | "travel_benefit";
  description: string;
  startDate: string;
  endDate: string;
  value: number;
  used: boolean;
  category: string;
}

export interface Offer {
  id: string;
  cardId: string;
  merchant: string;
  offerDetails: string;
  expirationDate: string;
  activated: boolean;
  estimatedValue: number;
  category: string;
}

export interface Transaction {
  id: string;
  cardId: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  optimalCard?: string;
  missedReward?: number;
}

export interface Recommendation {
  id: string;
  type: "optimization" | "expiring" | "action" | "high_value";
  title: string;
  description: string;
  estimatedValue: number | null;
  urgency: "low" | "medium" | "high" | "critical";
  createdAt: string;
  actionLabel?: string;
}

export interface SpendingCategory {
  category: string;
  amount: number;
  percentage: number;
  bestCard: string;
  currentCard: string;
  optimized: boolean;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const mockCards: CreditCard[] = [
  {
    id: "amex-gold",
    issuer: "American Express",
    cardName: "Gold Card",
    annualFee: 250,
    rewardProgram: "Membership Rewards",
    pointsBalance: 84_250,
    cashbackBalance: 0,
    activeOffers: 12,
    expiringBenefits: 3,
    lastSynced: "2026-09-24T14:30:00Z",
    color: "linear-gradient(135deg, #C6A84B 0%, #8B6914 50%, #D4AF37 100%)",
    logo: "💳",
    multipliers: [
      { category: "Restaurants", multiplier: 4, pointsPer: "4x MR points" },
      { category: "Groceries", multiplier: 4, pointsPer: "4x MR points" },
      { category: "Flights", multiplier: 3, pointsPer: "3x MR points" },
    ],
  },
  {
    id: "amex-bcp",
    issuer: "American Express",
    cardName: "Blue Cash Preferred",
    annualFee: 95,
    rewardProgram: "Cash Back",
    pointsBalance: 0,
    cashbackBalance: 247.83,
    activeOffers: 5,
    expiringBenefits: 1,
    lastSynced: "2026-09-24T14:30:00Z",
    color: "linear-gradient(135deg, #1A5276 0%, #2471A3 50%, #5DADE2 100%)",
    logo: "💳",
    multipliers: [
      { category: "Groceries", multiplier: 6, pointsPer: "6% cash back" },
      { category: "Streaming", multiplier: 6, pointsPer: "6% cash back" },
      { category: "Transit", multiplier: 3, pointsPer: "3% cash back" },
      { category: "Gas", multiplier: 3, pointsPer: "3% cash back" },
    ],
  },
  {
    id: "chase-sapphire",
    issuer: "Chase",
    cardName: "Sapphire Preferred",
    annualFee: 95,
    rewardProgram: "Ultimate Rewards",
    pointsBalance: 52_100,
    cashbackBalance: 0,
    activeOffers: 4,
    expiringBenefits: 2,
    lastSynced: "2026-09-24T12:15:00Z",
    color: "linear-gradient(135deg, #1B2631 0%, #1F618D 50%, #2E86C1 100%)",
    logo: "💳",
    multipliers: [
      { category: "Travel", multiplier: 5, pointsPer: "5x UR points" },
      { category: "Dining", multiplier: 3, pointsPer: "3x UR points" },
      { category: "Online Groceries", multiplier: 3, pointsPer: "3x UR points" },
      { category: "Streaming", multiplier: 3, pointsPer: "3x UR points" },
    ],
  },
  {
    id: "citi-custom",
    issuer: "Citi",
    cardName: "Custom Cash",
    annualFee: 0,
    rewardProgram: "ThankYou Points",
    pointsBalance: 12_340,
    cashbackBalance: 0,
    activeOffers: 2,
    expiringBenefits: 0,
    lastSynced: "2026-09-24T10:00:00Z",
    color: "linear-gradient(135deg, #1A237E 0%, #283593 50%, #3F51B5 100%)",
    logo: "💳",
    multipliers: [
      { category: "Top Category", multiplier: 5, pointsPer: "5% cash back" },
      { category: "Everything Else", multiplier: 1, pointsPer: "1% cash back" },
    ],
  },
  {
    id: "cap1-venture",
    issuer: "Capital One",
    cardName: "Venture X",
    annualFee: 395,
    rewardProgram: "Miles",
    pointsBalance: 67_800,
    cashbackBalance: 0,
    activeOffers: 7,
    expiringBenefits: 2,
    lastSynced: "2026-09-24T13:45:00Z",
    color: "linear-gradient(135deg, #1B1B2F 0%, #162447 50%, #1F4068 100%)",
    logo: "💳",
    multipliers: [
      { category: "Hotels", multiplier: 10, pointsPer: "10x miles" },
      { category: "Rental Cars", multiplier: 10, pointsPer: "10x miles" },
      { category: "Flights", multiplier: 5, pointsPer: "5x miles" },
      { category: "Everything Else", multiplier: 2, pointsPer: "2x miles" },
    ],
  },
];

export const mockBenefits: Benefit[] = [
  {
    id: "b1",
    cardId: "amex-gold",
    benefitType: "recurring_credit",
    description: "$10 Uber Cash monthly",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    value: 10,
    used: true,
    category: "Uber",
  },
  {
    id: "b2",
    cardId: "amex-gold",
    benefitType: "recurring_credit",
    description: "$10 Dining credit",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    value: 10,
    used: false,
    category: "Dining",
  },
  {
    id: "b3",
    cardId: "amex-gold",
    benefitType: "recurring_credit",
    description: "$10 Dunkin' credit",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    value: 10,
    used: false,
    category: "Dining",
  },
  {
    id: "b4",
    cardId: "chase-sapphire",
    benefitType: "recurring_credit",
    description: "$50 Hotel credit",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    value: 50,
    used: false,
    category: "Travel",
  },
  {
    id: "b5",
    cardId: "cap1-venture",
    benefitType: "recurring_credit",
    description: "$300 Travel credit",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    value: 300,
    used: false,
    category: "Travel",
  },
  {
    id: "b6",
    cardId: "cap1-venture",
    benefitType: "travel_benefit",
    description: "Priority Pass lounge access",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    value: 0,
    used: false,
    category: "Travel",
  },
  {
    id: "b7",
    cardId: "cap1-venture",
    benefitType: "travel_benefit",
    description: "$100 Global Entry/TSA PreCheck",
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    value: 100,
    used: true,
    category: "Travel",
  },
  {
    id: "b8",
    cardId: "amex-bcp",
    benefitType: "recurring_credit",
    description: "$7 Disney+ monthly credit",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    value: 7,
    used: true,
    category: "Streaming",
  },
  {
    id: "b9",
    cardId: "citi-custom",
    benefitType: "rotating_category",
    description: "5% back on Gas (Q3 top category)",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    value: 0,
    used: false,
    category: "Gas",
  },
];

export const mockOffers: Offer[] = [
  {
    id: "o1",
    cardId: "amex-gold",
    merchant: "Whole Foods",
    offerDetails: "Spend $75, get $15 back",
    expirationDate: "2026-09-28",
    activated: true,
    estimatedValue: 15,
    category: "Groceries",
  },
  {
    id: "o2",
    cardId: "amex-gold",
    merchant: "Home Depot",
    offerDetails: "10% back up to $50",
    expirationDate: "2026-10-15",
    activated: false,
    estimatedValue: 50,
    category: "Home",
  },
  {
    id: "o3",
    cardId: "amex-gold",
    merchant: "Best Buy",
    offerDetails: "Spend $200, get $40 back",
    expirationDate: "2026-09-30",
    activated: false,
    estimatedValue: 40,
    category: "Electronics",
  },
  {
    id: "o4",
    cardId: "amex-gold",
    merchant: "Shake Shack",
    offerDetails: "Spend $25, get $5 back",
    expirationDate: "2026-10-31",
    activated: true,
    estimatedValue: 5,
    category: "Dining",
  },
  {
    id: "o5",
    cardId: "chase-sapphire",
    merchant: "DoorDash",
    offerDetails: "5% back on DoorDash orders",
    expirationDate: "2026-09-26",
    activated: false,
    estimatedValue: 20,
    category: "Dining",
  },
  {
    id: "o6",
    cardId: "chase-sapphire",
    merchant: "Marriott",
    offerDetails: "Spend $300, get $60 back",
    expirationDate: "2026-11-30",
    activated: true,
    estimatedValue: 60,
    category: "Travel",
  },
  {
    id: "o7",
    cardId: "amex-gold",
    merchant: "Lululemon",
    offerDetails: "Spend $100, get $20 back",
    expirationDate: "2026-10-05",
    activated: false,
    estimatedValue: 20,
    category: "Shopping",
  },
  {
    id: "o8",
    cardId: "cap1-venture",
    merchant: "Uber",
    offerDetails: "5x miles on Uber rides",
    expirationDate: "2026-10-31",
    activated: true,
    estimatedValue: 25,
    category: "Transit",
  },
  {
    id: "o9",
    cardId: "cap1-venture",
    merchant: "VRBO",
    offerDetails: "10% back on VRBO bookings",
    expirationDate: "2026-12-31",
    activated: false,
    estimatedValue: 100,
    category: "Travel",
  },
  {
    id: "o10",
    cardId: "amex-bcp",
    merchant: "Target",
    offerDetails: "Spend $50, get $10 back",
    expirationDate: "2026-09-27",
    activated: false,
    estimatedValue: 10,
    category: "Shopping",
  },
  {
    id: "o11",
    cardId: "amex-gold",
    merchant: "Sephora",
    offerDetails: "Spend $75, get $15 back",
    expirationDate: "2026-10-10",
    activated: false,
    estimatedValue: 15,
    category: "Shopping",
  },
  {
    id: "o12",
    cardId: "amex-gold",
    merchant: "Grubhub",
    offerDetails: "$10 off $30+ orders",
    expirationDate: "2026-09-29",
    activated: true,
    estimatedValue: 10,
    category: "Dining",
  },
];

export const mockTransactions: Transaction[] = [
  { id: "t1", cardId: "amex-gold", merchant: "Trader Joe's", category: "Groceries", amount: 87.32, date: "2026-09-24" },
  { id: "t2", cardId: "chase-sapphire", merchant: "Netflix", category: "Streaming", amount: 15.99, date: "2026-09-23", optimalCard: "amex-bcp", missedReward: 0.80 },
  { id: "t3", cardId: "amex-gold", merchant: "Chick-fil-A", category: "Restaurants", amount: 12.50, date: "2026-09-23" },
  { id: "t4", cardId: "citi-custom", merchant: "Shell", category: "Gas", amount: 52.00, date: "2026-09-22" },
  { id: "t5", cardId: "chase-sapphire", merchant: "Spotify", category: "Streaming", amount: 10.99, date: "2026-09-22", optimalCard: "amex-bcp", missedReward: 0.55 },
  { id: "t6", cardId: "cap1-venture", merchant: "Delta Airlines", category: "Flights", amount: 380.00, date: "2026-09-21" },
  { id: "t7", cardId: "amex-gold", merchant: "Olive Garden", category: "Restaurants", amount: 64.20, date: "2026-09-21" },
  { id: "t8", cardId: "chase-sapphire", merchant: "Uber Eats", category: "Dining", amount: 32.50, date: "2026-09-20" },
  { id: "t9", cardId: "amex-bcp", merchant: "Kroger", category: "Groceries", amount: 156.78, date: "2026-09-20" },
  { id: "t10", cardId: "cap1-venture", merchant: "Hilton", category: "Hotels", amount: 215.00, date: "2026-09-19" },
  { id: "t11", cardId: "amex-gold", merchant: "Amazon", category: "Shopping", amount: 45.99, date: "2026-09-19", optimalCard: "chase-sapphire", missedReward: 0.92 },
  { id: "t12", cardId: "citi-custom", merchant: "Exxon", category: "Gas", amount: 48.30, date: "2026-09-18" },
  { id: "t13", cardId: "amex-gold", merchant: "Sweetgreen", category: "Restaurants", amount: 18.75, date: "2026-09-18" },
  { id: "t14", cardId: "chase-sapphire", merchant: "Airbnb", category: "Travel", amount: 450.00, date: "2026-09-17" },
  { id: "t15", cardId: "amex-bcp", merchant: "Costco Gas", category: "Gas", amount: 65.40, date: "2026-09-17", optimalCard: "citi-custom", missedReward: 1.31 },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "r1",
    type: "action",
    title: "Activate Best Buy offer before it expires",
    description: "Your Amex Gold has a $40 back on $200 spend at Best Buy. This offer expires September 30.",
    estimatedValue: 40,
    urgency: "high",
    createdAt: "2026-09-24T10:00:00Z",
    actionLabel: "Activate Offer",
  },
  {
    id: "r2",
    type: "expiring",
    title: "Dining credit expires in 6 days",
    description: "Your $10 Amex Gold dining credit has not been used this month. Use it at any restaurant before September 30.",
    estimatedValue: 10,
    urgency: "critical",
    createdAt: "2026-09-24T09:00:00Z",
    actionLabel: "View Details",
  },
  {
    id: "r3",
    type: "optimization",
    title: "Move streaming subscriptions to Amex BCP",
    description: "Netflix ($15.99) and Spotify ($10.99) are on Chase Sapphire. Move them to Amex Blue Cash Preferred for 6% cash back instead of 3x points — estimated annual gain of $16.20.",
    estimatedValue: 16.20,
    urgency: "medium",
    createdAt: "2026-09-24T08:00:00Z",
  },
  {
    id: "r4",
    type: "high_value",
    title: "$300 travel credit unused",
    description: "Your Capital One Venture X has a $300 annual travel credit that resets on your card anniversary. Use it for any travel purchase.",
    estimatedValue: 300,
    urgency: "medium",
    createdAt: "2026-09-23T12:00:00Z",
    actionLabel: "Learn More",
  },
  {
    id: "r5",
    type: "optimization",
    title: "Use Amex Gold for all grocery spending",
    description: "You used Amex BCP for a $156.78 Kroger purchase, but Amex Gold earns 4x MR points (valued at ~$125/year for typical grocery spend). Consider using Amex Gold unless you value cash back over MR points.",
    estimatedValue: 45,
    urgency: "low",
    createdAt: "2026-09-23T10:00:00Z",
  },
  {
    id: "r6",
    type: "action",
    title: "DoorDash offer expires in 2 days",
    description: "Chase Sapphire has a 5% back DoorDash offer expiring September 26. Activate it now.",
    estimatedValue: 20,
    urgency: "critical",
    createdAt: "2026-09-24T07:00:00Z",
    actionLabel: "Activate Offer",
  },
  {
    id: "r7",
    type: "expiring",
    title: "Target offer expires in 3 days",
    description: "Your Amex BCP has a $10 back on $50 spend at Target. Expires September 27.",
    estimatedValue: 10,
    urgency: "high",
    createdAt: "2026-09-24T06:00:00Z",
    actionLabel: "Activate Offer",
  },
  {
    id: "r8",
    type: "high_value",
    title: "$50 hotel credit available",
    description: "Your Chase Sapphire Preferred has a $50 annual hotel credit. Book through the Chase Travel portal to redeem.",
    estimatedValue: 50,
    urgency: "low",
    createdAt: "2026-09-22T12:00:00Z",
    actionLabel: "Book Travel",
  },
];

export const mockSpendingCategories: SpendingCategory[] = [
  { category: "Restaurants", amount: 845, percentage: 22, bestCard: "Amex Gold (4x)", currentCard: "Amex Gold", optimized: true },
  { category: "Groceries", amount: 720, percentage: 19, bestCard: "Amex BCP (6%)", currentCard: "Mixed", optimized: false },
  { category: "Travel", amount: 1045, percentage: 27, bestCard: "Venture X (5-10x)", currentCard: "Mixed", optimized: false },
  { category: "Gas", amount: 165, percentage: 4, bestCard: "Citi Custom Cash (5%)", currentCard: "Citi Custom Cash", optimized: true },
  { category: "Streaming", amount: 52, percentage: 1, bestCard: "Amex BCP (6%)", currentCard: "Chase Sapphire", optimized: false },
  { category: "Shopping", amount: 340, percentage: 9, bestCard: "Venture X (2x)", currentCard: "Mixed", optimized: false },
  { category: "Dining Delivery", amount: 180, percentage: 5, bestCard: "Amex Gold (4x)", currentCard: "Chase Sapphire", optimized: false },
  { category: "Other", amount: 480, percentage: 13, bestCard: "Venture X (2x)", currentCard: "Various", optimized: false },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getCardById(id: string): CreditCard | undefined {
  return mockCards.find((c) => c.id === id);
}

export function getCardDisplayName(id: string): string {
  const card = getCardById(id);
  return card ? `${card.issuer} ${card.cardName}` : id;
}

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function formatPoints(points: number): string {
  return new Intl.NumberFormat("en-US").format(points);
}

export function getPortfolioTotals() {
  const totalPoints = mockCards.reduce((sum, c) => sum + c.pointsBalance, 0);
  const totalCashback = mockCards.reduce((sum, c) => sum + c.cashbackBalance, 0);
  const totalOffers = mockCards.reduce((sum, c) => sum + c.activeOffers, 0);
  const totalExpiring = mockCards.reduce((sum, c) => sum + c.expiringBenefits, 0);
  const totalAnnualFees = mockCards.reduce((sum, c) => sum + c.annualFee, 0);
  const totalCards = mockCards.length;

  // Estimated value of credits used + unused
  const totalCreditsAvailable = mockBenefits
    .filter((b) => !b.used && b.value > 0)
    .reduce((sum, b) => sum + b.value, 0);

  const missedRewards = mockTransactions
    .filter((t) => t.missedReward)
    .reduce((sum, t) => sum + (t.missedReward || 0), 0);

  return {
    totalCards,
    totalPoints,
    totalCashback,
    totalOffers,
    totalExpiring,
    totalAnnualFees,
    totalCreditsAvailable,
    missedRewards,
  };
}

// Spending data for charts
export const monthlySpending = [
  { month: "Apr", amount: 3200 },
  { month: "May", amount: 3800 },
  { month: "Jun", amount: 2900 },
  { month: "Jul", amount: 4100 },
  { month: "Aug", amount: 3500 },
  { month: "Sep", amount: 3827 },
];

// Purchase advisor mock response
export interface AdvisorResponse {
  bestCard: string;
  cardId: string;
  reason: string[];
  estimatedValue: string;
  alternatives: { card: string; cardId: string; estimatedValue: string }[];
}

export function getAdvisorRecommendation(
  merchant: string,
  category: string,
  amount: number
): AdvisorResponse {
  const cat = category.toLowerCase();

  if (cat.includes("grocer")) {
    return {
      bestCard: "American Express Gold Card",
      cardId: "amex-gold",
      reason: [
        "4x MR points on groceries (up to $25,000/year)",
        "Active Whole Foods $15 back offer",
        `Estimated reward: ${Math.round(amount * 4)} MR points (~${formatCurrency(amount * 4 * 0.02)})`,
      ],
      estimatedValue: `${Math.round(amount * 4)} MR points`,
      alternatives: [
        {
          card: "Amex Blue Cash Preferred",
          cardId: "amex-bcp",
          estimatedValue: formatCurrency(amount * 0.06) + " cash back",
        },
      ],
    };
  }

  if (cat.includes("restaurant") || cat.includes("dining")) {
    return {
      bestCard: "American Express Gold Card",
      cardId: "amex-gold",
      reason: [
        "4x MR points on restaurants worldwide",
        "$10 dining credit still available this month",
        `Estimated reward: ${Math.round(amount * 4)} MR points (~${formatCurrency(amount * 4 * 0.02)})`,
      ],
      estimatedValue: `${Math.round(amount * 4)} MR points`,
      alternatives: [
        {
          card: "Chase Sapphire Preferred",
          cardId: "chase-sapphire",
          estimatedValue: `${Math.round(amount * 3)} UR points`,
        },
      ],
    };
  }

  if (cat.includes("travel") || cat.includes("hotel") || cat.includes("flight")) {
    return {
      bestCard: "Capital One Venture X",
      cardId: "cap1-venture",
      reason: [
        cat.includes("hotel") ? "10x miles on hotels booked through Capital One Travel" : "5x miles on flights booked through Capital One Travel",
        "$300 travel credit applies automatically",
        `Estimated reward: ${Math.round(amount * (cat.includes("hotel") ? 10 : 5))} miles`,
      ],
      estimatedValue: `${Math.round(amount * (cat.includes("hotel") ? 10 : 5))} miles`,
      alternatives: [
        {
          card: "Chase Sapphire Preferred",
          cardId: "chase-sapphire",
          estimatedValue: `${Math.round(amount * 5)} UR points`,
        },
      ],
    };
  }

  if (cat.includes("gas")) {
    return {
      bestCard: "Citi Custom Cash",
      cardId: "citi-custom",
      reason: [
        "5% cash back on your top spending category",
        "Gas is currently your top category this quarter",
        `Estimated reward: ${formatCurrency(amount * 0.05)} cash back`,
      ],
      estimatedValue: formatCurrency(amount * 0.05),
      alternatives: [
        {
          card: "Amex Blue Cash Preferred",
          cardId: "amex-bcp",
          estimatedValue: formatCurrency(amount * 0.03) + " cash back",
        },
      ],
    };
  }

  if (cat.includes("streaming")) {
    return {
      bestCard: "Amex Blue Cash Preferred",
      cardId: "amex-bcp",
      reason: [
        "6% cash back on select streaming services",
        `Estimated reward: ${formatCurrency(amount * 0.06)} cash back`,
      ],
      estimatedValue: formatCurrency(amount * 0.06),
      alternatives: [
        {
          card: "Chase Sapphire Preferred",
          cardId: "chase-sapphire",
          estimatedValue: `${Math.round(amount * 3)} UR points`,
        },
      ],
    };
  }

  // Default
  return {
    bestCard: "Capital One Venture X",
    cardId: "cap1-venture",
    reason: [
      "2x miles on all purchases (best base rate)",
      `Estimated reward: ${Math.round(amount * 2)} miles (~${formatCurrency(amount * 2 * 0.01)})`,
    ],
    estimatedValue: `${Math.round(amount * 2)} miles`,
    alternatives: [
      {
        card: "Citi Custom Cash",
        cardId: "citi-custom",
        estimatedValue: formatCurrency(amount * 0.01),
      },
    ],
  };
}
