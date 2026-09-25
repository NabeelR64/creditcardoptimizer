import { NextResponse } from 'next/server';
import { plaidClient } from '@/lib/plaid';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { CountryCode, Products } from 'plaid';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: session.user.id,
      },
      client_name: 'CardCopilot',
      products: [Products.Transactions],
      country_codes: [CountryCode.Us],
      language: 'en',
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Plaid error:', error);
    return NextResponse.json({ error: 'Failed to create link token' }, { status: 500 });
  }
}
