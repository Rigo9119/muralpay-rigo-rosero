"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransfer, executeTransfer } from "@/data/transfer";
import { transferKeys } from "../queries/useTransfer";

interface UseTransferMutationProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useCreateTransferMutation({ 
  onSuccess, 
  onError 
}: UseTransferMutationProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransfer,
    onSuccess: (data) => {
      queryClient.setQueryData(
        transferKeys.detail(data.payoutAccountId),
        data
      );

      queryClient.invalidateQueries({
        queryKey: transferKeys.all,
      });

      onSuccess?.();
    },
    onError: (error) => {
      console.error('Error creating transfer:', error);
      onError?.(error instanceof Error ? error : new Error('Failed to create transfer'));
    },
  });
}

export function useExecuteTransferMutation({ onSuccess }: UseTransferMutationProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: executeTransfer,
    onSuccess: (data) => {
      // Update the cache with the executed transfer
      queryClient.setQueryData(
        transferKeys.detail(data.payoutAccountId),
        data
      );

      onSuccess?.();
    },
    onError: (error) => {
      console.error('Error executing transfer:', error);
    },
  });
} 