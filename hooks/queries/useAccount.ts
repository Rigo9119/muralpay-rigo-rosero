"use client";
import { useQuery } from "@tanstack/react-query";
import { getAccount } from "@/data/account";
import type { Account } from "@/utils/types";

export const accountKeys = {
  all: ['last account'] as const,
  detail: (id: string) => [...accountKeys.all, id] as const,
};

export function useAccount() {
  // Get the account ID from localStorage
  const accountId = typeof window !== 'undefined' ? localStorage.getItem('lastCreatedAccountId') : null;

  return useQuery<Account | null>({
    queryKey: accountKeys.detail(accountId || ''),
    queryFn: () => accountId ? getAccount(accountId) : null,
    enabled: !!accountId,
  });
} 