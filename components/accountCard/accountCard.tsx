import { Button } from "../ui/button";

export interface AccountCardProps {
	accountName: string;
	accountAddress: string;
	accountBalance: { balance: number; tokenSymbol: string };
	onTransferClick: () => void;
}

export default function AccountCard({
	accountName,
	accountAddress,
	accountBalance,
	onTransferClick,
}: AccountCardProps) {
	return (
		<div className="flex flex-row items-center justify-between p-6 bg-white rounded-lg shadow">
			<div className="">
				<div>
					<h3 className="text-xl font-semibold mb-4">Account Details</h3>
					<div className="space-y-3">
						<div>
							<span className="font-medium text-gray-500">Name: </span>
							{accountName}
						</div>
						<div>
							<span className="font-medium text-gray-500">Address: </span>
							{accountAddress}
						</div>
						<div>
							<span className="font-medium text-gray-500">Balance: </span>
							{`$${accountBalance.balance} ${accountBalance.tokenSymbol}`}
						</div>
					</div>
				</div>
			</div>

			<div className="flex fle-row items-center justify-center">
				<Button onClick={onTransferClick}>Transfer</Button>
			</div>
		</div>
	);
}
