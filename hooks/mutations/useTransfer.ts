"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransfer, executeTransfer } from "@/data/transfer";
import { transferKeys } from "../queries/useTransfer";

interface UseTransferMutationProps {
  onSuccess?: () => void;
}

export function useCreateTransferMutation({ onSuccess }: UseTransferMutationProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransfer,
    onSuccess: (data) => {
      // Update the cache with the new transfer
      queryClient.setQueryData(
        transferKeys.detail(data.payoutAccountId),
        data
      );

      // Invalidate the transfers list
      queryClient.invalidateQueries({
        queryKey: transferKeys.all,
      });

      onSuccess?.();
    },
    onError: (error) => {
      console.error('Error creating transfer:', error);
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