"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { Button } from '@/components/ui/button';
import { Link2, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function PlaidLinkButton() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchLinkToken() {
      try {
        const response = await fetch('/api/plaid/create-link-token', { method: 'POST' });
        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (e) {
        console.error("Failed to fetch link token", e);
      }
    }
    fetchLinkToken();
  }, []);

  const onSuccess = useCallback(async (public_token: string) => {
    setIsLoading(true);
    try {
      await fetch('/api/plaid/set-access-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token }),
      });
      // Refresh the page to show new cards
      router.refresh();
    } catch (e) {
      console.error("Failed to set access token", e);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button 
      onClick={() => open()} 
      disabled={!ready || !linkToken || isLoading}
      className="bg-primary/20 text-primary hover:bg-primary/30"
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <Link2 className="w-4 h-4 mr-2" />
      )}
      Connect Bank Account
    </Button>
  );
}
