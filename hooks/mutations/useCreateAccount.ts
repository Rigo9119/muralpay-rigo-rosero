"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAccount } from "@/data/account";
import { accountKeys } from "../queries/useAccount";

interface UseCreateAccountProps {
  onSuccess?: () => void;
}

export function useCreateAccount({ onSuccess }: UseCreateAccountProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => {
      queryClient.setQueryData(
        accountKeys.detail(data.id),
        data
      );
      // save the last created item with id on ls 
      localStorage.setItem('lastCreatedAccountId', data.id);

      queryClient.invalidateQueries({
        queryKey: accountKeys.all,
      });

      console.log('Account created successfully');
      onSuccess?.(); // Call the success callback if provided
    },
    onError: (error) => {
      console.error('Error creating account:', error);
    },
  });
} 