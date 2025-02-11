"use client";
import TransferCard from "@/components/transferCard/transferCard";
import { useTransfer } from "@/hooks/queries/useTransfer";

export default function TransfersPage() {
  const { data: transfer, isLoading } = useTransfer("3fa85f64-5717-4562-b3fc-2c963f66afa6");

  if (isLoading) return <div>Loading...</div>;
  if (!transfer) return <div>No transfer found</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Transfers</h1>
      <TransferCard
        transferId={transfer.payoutAccountId}
        status={transfer.status || "PENDING"}
        memo={transfer.memo}
        amount={transfer.recipientsInfo[0].tokenAmount}
        currency={transfer.recipientsInfo[0].bankDetails.currencyCode}
      />
    </div>
  );
} 