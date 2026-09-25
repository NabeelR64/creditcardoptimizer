import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { public_token } = await req.json();
    
    // Exchange the public token for an access token
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    
    const accessToken = exchangeResponse.data.access_token;
    const itemId = exchangeResponse.data.item_id;

    // Fetch accounts associated with the Item
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accounts = accountsResponse.data.accounts;

    // In a real app, you'd store the access_token securely (e.g., encrypted in the database)
    // and sync the accounts/transactions to the database here.
    // For MVP, we'll log them and return success.
    console.log(`Successfully linked ${accounts.length} accounts for user ${session.user.id}`);

    // Map credit card accounts to the database
    for (const account of accounts) {
      if (account.type === 'credit') {
        await prisma.creditCard.create({
          data: {
            userId: session.user.id,
            issuer: account.name,
            cardName: account.official_name || account.name,
            annualFee: 0, // Would need to be updated manually or by another API
            rewardProgram: 'Standard Rewards',
          }
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Plaid exchange error:', error);
    return NextResponse.json({ error: 'Failed to exchange token' }, { status: 500 });
  }
}
