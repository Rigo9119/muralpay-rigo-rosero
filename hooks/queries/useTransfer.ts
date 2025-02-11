"use client";
import { useQuery } from "@tanstack/react-query";
import { getTransfer } from "@/data/transfer";
import type { Transfer } from "@/utils/types";

export const transferKeys = {
  all: ['transfers'] as const,
  detail: (id: string) => [...transferKeys.all, id] as const,
};

export function useTransfer(id: string | null) {
  return useQuery<Transfer | null>({
    queryKey: transferKeys.detail(id || ''),
    queryFn: () => id ? getTransfer(id) : null,
    enabled: !!id,
  });
} 