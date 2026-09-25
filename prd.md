# Product Requirements Document (PRD)

# Credit Card Optimization Copilot

## Version
1.0

## Author
Product Concept by User

## Status
Draft – Ready for Engineering Breakdown

---

# 1. Executive Summary

Credit Card Optimization Copilot is a personal finance web application designed to help users maximize the value of their credit card portfolio.

Most consumers hold multiple credit cards, each with different:

- Reward multipliers
- Rotating categories
- Statement credits
- Limited-time offers
- Merchant-specific promotions
- Travel benefits
- Lounge access
- Insurance protections
- Spending thresholds

Tracking these benefits manually is difficult and often results in missed opportunities and lost rewards.

The application will provide a centralized dashboard that continuously tracks card benefits, analyzes spending activity, identifies optimization opportunities, and uses AI to recommend the best card for any purchase.

The primary goal is to ensure users never miss available perks and consistently maximize rewards earned across all cards.

---

# 2. Problem Statement

Users with multiple credit cards struggle to answer questions such as:

- Which card should I use for this purchase?
- What offers expire this week?
- Which credits have I not used this month?
- Am I earning maximum points?
- Which recurring subscriptions are on the wrong card?
- Are there any new promotions available?
- What benefits am I paying annual fees for but not using?

Current solutions are fragmented across:

- Credit card issuer websites
- Bank mobile applications
- Email promotions
- Offer portals
- Manual spreadsheets

The user wants a single intelligent system that continuously optimizes their card usage.

---

# 3. Product Vision

Create a personal AI-powered credit card assistant that:

1. Tracks all credit card perks and benefits.
2. Identifies expiring opportunities.
3. Recommends the optimal card for every purchase.
4. Detects missed rewards opportunities.
5. Monitors spending patterns.
6. Provides actionable recommendations.
7. Automates as much reward optimization as possible.

---

# 4. Success Metrics

### User Value Metrics

- Number of offers activated
- Number of expiring benefits utilized
- Additional rewards earned
- Annual fee recovery percentage
- Monthly savings generated
- Total statement credits captured

### Product Metrics

- Daily active users
- Weekly active users
- Recommendation usage count
- Offer activation rate
- Spending optimization rate
- Notification engagement rate

---

# 5. Target User

## Primary User

Power credit card users with:

- 2–15 credit cards
- Rewards-focused spending behavior
- Interest in travel points, cashback, and perks
- Desire to maximize ROI on annual fees

## Example User

A user owns:

- American Express Gold
- American Express Blue Cash Preferred
- Chase Sapphire Preferred
- Citi Custom Cash

The user wants to know:

- Which card to use today
- Which card to use for groceries
- Which card to use for streaming
- Which credits expire this month
- Whether spending patterns can be improved

---

# 6. Core Features

---

## Feature 1: Credit Card Portfolio Dashboard

### Description

Centralized view of all connected cards.

### User Story

As a user, I want to see all my cards in one place so I can understand my rewards ecosystem.

### Display

For each card:

- Card name
- Issuer
- Annual fee
- Current points balance
- Cashback balance
- Active offers
- Expiring benefits
- Last synced date

### Example

| Card | Active Offers | Credits Remaining |
|--------|--------|--------|
| Amex Gold | 12 | $20 Dining |
| CSP | 4 | $50 Hotel |
| Citi Custom Cash | 2 | N/A |

---

## Feature 2: Offer & Benefits Tracker

### Description

Track all available benefits.

### Categories

#### Recurring Credits

Examples:

- Uber credits
- Dining credits
- Hotel credits
- Streaming credits

#### Rotating Categories

Examples:

- 5% groceries
- 5% gas
- 5% PayPal

#### Merchant Offers

Examples:

- Spend $50, get $10 back
- 10% back at specific stores

#### Travel Benefits

Examples:

- Lounge visits
- TSA PreCheck credits
- Global Entry credits
- Free checked bags

### User Story

As a user, I want to know what benefits exist right now and which ones expire soon.

---

## Feature 3: Daily, Weekly, and Monthly Opportunity Engine

### Description

Automatically surface opportunities.

### Daily Examples

- New Amex Offer available
- Limited-time bonus activated

### Weekly Examples

- Offer expires in 5 days
- Dining credit unused

### Monthly Examples

- Monthly credits not redeemed
- Category bonuses changing next month

### Output

Dashboard cards:

- Action Required
- Expiring Soon
- High Value Opportunities

---

## Feature 4: AI Purchase Advisor

### Description

User asks:

> Which card should I use for this purchase?

System recommends the optimal card.

### Input

- Merchant name
- Category
- Purchase amount
- Optional: description of items

### Example

Input:

```text
Merchant: Kroger
Category: Grocery
Amount: $150
```

Output:

```text
Use Amex Gold

Reason:
- 4x grocery multiplier
- Active grocery bonus this month
- Estimated value: 600 points

Alternative:
- Citi Custom Cash
- Estimated value: 450 points
```

---

## Feature 5: Transaction Monitoring

### Description

Import transactions through Plaid.

### User Story

As a user, I want the app to understand where I spend money.

### Capabilities

- Categorize spending
- Detect recurring subscriptions
- Track merchant trends
- Build optimization suggestions

---

## Feature 6: Missed Rewards Detection

### Description

Analyze historical transactions.

Identify situations where a better card should have been used.

### Example

Netflix Subscription:

Current Card:

- Chase Sapphire Preferred

Alternative:

- Amex Blue Cash Preferred

Potential Improvement:

- Additional cashback earned

Output:

```text
Move Netflix to Amex BCP

Expected Annual Gain:
$34
```

---

## Feature 7: Optimization Feed

### Description

AI-generated recommendations.

Examples:

```text
Move all grocery spending to Amex Gold.

Estimated annual gain:
18,000 points.
```

```text
Dining credit expires in 4 days.
```

```text
Activate Amex offer before purchase.
```

---

## Feature 8: Notifications & Alerts

### Channels

### Phase 1

- Email

### Phase 2

- Browser notifications

### Phase 3

- SMS
- Push notifications

### Alert Types

- Expiring offers
- Unused monthly credits
- New promotions
- Optimization opportunities

---

# 7. Authentication & Security

## Requirements

The application contains financial data and must be secure.

### Authentication

Required on every access.

Supported login methods:

- Email + Password
- Google OAuth (optional)

### Password Security

Requirements:

- Never store plaintext passwords
- Argon2 hashing
- Salted hashes
- Strong password requirements

### Session Security

- Secure HTTP-only cookies
- Session expiration
- CSRF protection
- Rate limiting
- Account lockout after repeated failures

### Data Security

Encrypt:

- Plaid access tokens
- OAuth tokens
- User profile data

### Compliance

Target:

- SOC2-friendly architecture
- OWASP Top 10 protections

### Explicit Non-Goals

The application will NEVER store:

- Full card numbers
- CVVs
- Banking credentials

---

# 8. Integrations

## Plaid

Purpose:

- Connect credit card accounts
- Import transactions
- Retrieve balances

---

## OpenAI API

Purpose:

- Purchase recommendations
- Spending analysis
- Opportunity discovery
- Natural language interactions

---

## Email Provider

Options:

- Resend
- AWS SES
- SendGrid

Purpose:

- Alert delivery
- Verification emails
- Password reset

---

# 9. AI Features

## Natural Language Assistant
use minimal model required to keep costs low. 

Examples:

```text
Which card should I use at Costco?
```

```text
What offers expire this week?
```

```text
How can I earn more points this month?
```

```text
Why did you recommend this card?
```

---

## Recommendation Engine

Inputs:

- User card portfolio
- Active offers
- Current reward multipliers
- Historical spending
- Purchase amount
- Merchant category

Outputs:

- Best card
- Expected reward value
- Explanation
- Alternative options

---

# 10. Dashboard Layout

## Home Page

### Section 1

Portfolio Summary

- Total cards
- Points balances
- Cashback balances

### Section 2

Action Center

- Activate offers
- Expiring credits
- Unused benefits

### Section 3

Recommendations

- AI optimization feed

### Section 4

Recent Spending

- Transaction summaries

### Section 5

Best Opportunities

- Highest-value actions available

---

# 11. Data Model

## User

```yaml
id
email
password_hash
created_at
last_login
```

## CreditCard

```yaml
id
user_id
issuer
card_name
annual_fee
reward_program
```

## Benefit

```yaml
id
card_id
benefit_type
description
start_date
end_date
value
```

## Offer

```yaml
id
card_id
merchant
offer_details
expiration_date
```

## Transaction

```yaml
id
card_id
merchant
category
amount
date
```

## Recommendation

```yaml
id
user_id
recommendation_text
estimated_value
created_at
```

---

# 12. Technical Architecture

## Frontend

```text
Next.js
TypeScript
Tailwind
ShadCN UI
```

## Backend

```text
Next.js API Routes
or
FastAPI
```

## Database

```text
PostgreSQL
```

## ORM

```text
Prisma
```

## Authentication

```text
Auth.js
```

## Hosting

```text
Vercel
```

## Scheduled Jobs

```text
Daily Offer Sync
Weekly Analysis
Monthly Optimization Scan
```

---

# 13. MVP Scope

## Included

- User accounts
- Secure login
- Card management
- Plaid integration
- Transaction imports
- Offer tracking
- AI purchase advisor
- Optimization recommendations
- Email notifications

## Excluded

- Mobile applications
- Family accounts
- Shared portfolios
- Tax reporting
- Investment tracking
- Bank account optimization

---

# 14. Future Enhancements

## Phase 2

- Browser notifications
- Mobile app
- Auto-categorization improvements
- Reward valuation customization

## Phase 3

- SMS notifications
- Household accounts
- Travel planning assistant
- Award redemption recommendations
- Automatic offer activation (where APIs permit)

## Phase 4

- Multi-user comparison
- Credit score optimization
- Annual fee ROI analysis
- Churn strategy planning
- Retention offer tracking

---

# 15. Key Product Principle

The application should function as a personal rewards strategist.

The user should never need to visit multiple credit card websites to understand:

- What benefits exist
- What benefits are expiring
- Which card should be used
- How spending can be optimized
- How much value is being left on the table

The system should proactively identify opportunities and continuously maximize the financial value generated from the user's credit card portfolio.

One additional recommendation for your agents: build the recommendation engine as a deterministic rules engine first (reward multipliers, active offers, statement credits, category bonuses, annualized value calculations) and use the LLM primarily for explanations and natural-language interaction. That will make recommendations more accurate, cheaper, auditable, and easier to test than relying solely on an LLM for card selection.