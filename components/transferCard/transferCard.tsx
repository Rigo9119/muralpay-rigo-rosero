"use client";
import { Button } from "../ui/button";
import { useExecuteTransferMutation } from "@/hooks/mutations/useTransfer";
import { useToast } from "@/hooks/use-toast";

export interface TransferCardProps {
  transferId: string;
  status: string;
  memo?: string;
  amount: number;
  currency: string;
}

export default function TransferCard({
  transferId,
  status,
  memo,
  amount,
  currency,
}: TransferCardProps) {
  const { toast } = useToast();
  const executeMutation = useExecuteTransferMutation({
    onSuccess: () => {
      toast({
        title: "Transfer executed",
        description: "Your transfer has been executed successfully.",
      });
    },
  });

  return (
    <div className="flex flex-row items-center justify-between p-6 bg-white rounded-lg shadow">
      <div className="space-y-3">
        <div>
          <span className="font-medium text-gray-500">Status: </span>
          {status}
        </div>
        {memo && (
          <div>
            <span className="font-medium text-gray-500">Memo: </span>
            {memo}
          </div>
        )}
        <div>
          <span className="font-medium text-gray-500">Amount: </span>
          {`${amount} ${currency}`}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center">
        {status !== "EXECUTED" && (
          <Button
            onClick={() => executeMutation.mutate({ id: transferId })}
            disabled={executeMutation.isPending}
          >
            {executeMutation.isPending ? "Executing..." : "Execute Transfer"}
          </Button>
        )}
      </div>
    </div>
  );
} 