"use client";
import { useTransfer } from "@/hooks/queries/useTransfer";
import { useExecuteTransferMutation } from "@/hooks/mutations/useTransfer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface TransferDetailsProps {
  transferId: string;
}

export function TransferDetails({ transferId }: TransferDetailsProps) {
  const { toast } = useToast();
  const { data: transfer, isLoading, isError } = useTransfer(transferId);
  
  const executeMutation = useExecuteTransferMutation({
    onSuccess: () => {
      toast({
        title: "Transfer executed",
        description: "Your transfer has been executed successfully.",
      });
    },
  });

  if (isLoading) return <div>Loading transfer details...</div>;
  if (isError) return <div>Error loading transfer</div>;
  if (!transfer) return <div>No transfer found</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Transfer Details</h2>
        {transfer.status !== 'EXECUTED' && (
          <Button 
            onClick={() => executeMutation.mutate({ id: transfer.payoutAccountId})}
            disabled={executeMutation.isPending}
          >
            {executeMutation.isPending ? 'Executing...' : 'Execute Transfer'}
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        <div>
          <span className="font-medium">Status: </span>
          {transfer.status}
        </div>
        <div>
          <span className="font-medium">Memo: </span>
          {transfer.memo}
        </div>
        {/* Add more transfer details */}
      </div>
    </div>
  );
} 