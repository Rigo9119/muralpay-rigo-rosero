"use client";
import AccountCard from "@/components/accountCard/accountCard";
import TransferForm from "@/components/forms/transferForm/transferForm";
import { useAccount } from "@/hooks/queries/useAccount";
import { useState } from "react";

export default function HomeComponent() {
	const [showTransferForm, setShowTransferForm] = useState(false);
	const { data: account, isLoading, isError, error } = useAccount();

	if (isLoading) return <div>Loading account data...</div>;
	if (isError) return <div>Error loading account: {error.message}</div>;
	if (!account) return <div>No account data available</div>;

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-bold">Account Overview</h2>
			</div>

			<AccountCard
				accountName={account.name}
				accountAddress={account.address}
				accountBalance={account.balance}
				onTransferClick={() => setShowTransferForm(!showTransferForm)}
			/>

			{showTransferForm && (
				<TransferForm onSuccess={() => setShowTransferForm(!showTransferForm)} />
			)}
		</div>
	);
}
