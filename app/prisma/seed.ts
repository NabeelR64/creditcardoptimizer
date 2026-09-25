import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import {
  mockCards,
  mockBenefits,
  mockOffers,
  mockTransactions,
  mockRecommendations,
} from "../src/lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await argon2.hash("password123");

  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "Test User",
      passwordHash,
    },
  });

  console.log(`User created: ${user.email} (password: password123)`);

  // Clear existing data for the user to avoid duplicates
  await prisma.creditCard.deleteMany({ where: { userId: user.id } });
  await prisma.recommendation.deleteMany({ where: { userId: user.id } });

  // Add Cards
  for (const card of mockCards) {
    const createdCard = await prisma.creditCard.create({
      data: {
        id: card.id,
        userId: user.id,
        issuer: card.issuer,
        cardName: card.cardName,
        annualFee: card.annualFee,
        rewardProgram: card.rewardProgram,
        createdAt: new Date(card.lastSynced),
      },
    });

    // Add Benefits
    const cardBenefits = mockBenefits.filter((b) => b.cardId === card.id);
    for (const benefit of cardBenefits) {
      await prisma.benefit.create({
        data: {
          id: benefit.id,
          cardId: createdCard.id,
          benefitType: benefit.benefitType,
          description: benefit.description,
          startDate: new Date(benefit.startDate),
          endDate: new Date(benefit.endDate),
          value: benefit.value,
        },
      });
    }

    // Add Offers
    const cardOffers = mockOffers.filter((o) => o.cardId === card.id);
    for (const offer of cardOffers) {
      await prisma.offer.create({
        data: {
          id: offer.id,
          cardId: createdCard.id,
          merchant: offer.merchant,
          offerDetails: offer.offerDetails,
          expirationDate: new Date(offer.expirationDate),
        },
      });
    }

    // Add Transactions
    const cardTransactions = mockTransactions.filter((t) => t.cardId === card.id);
    for (const tx of cardTransactions) {
      await prisma.transaction.create({
        data: {
          id: tx.id,
          cardId: createdCard.id,
          merchant: tx.merchant,
          category: tx.category,
          amount: tx.amount,
          date: new Date(tx.date),
        },
      });
    }
  }

  // Add Recommendations
  for (const rec of mockRecommendations) {
    await prisma.recommendation.create({
      data: {
        id: rec.id,
        userId: user.id,
        recommendationText: `${rec.title}: ${rec.description}`,
        estimatedValue: rec.estimatedValue,
        createdAt: new Date(rec.createdAt),
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
