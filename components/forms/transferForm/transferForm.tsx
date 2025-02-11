"use client";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import type { RecipientInfo, Transfer } from "@/utils/types";
import FieldInput from "../components/fieldInput/fileInput";
import { useCreateTransferMutation } from "@/hooks/mutations/useTransfer";
import { useToast } from "@/hooks/use-toast";
import FieldSelect from "../components/fieldSelect/fieldSelect";
import { selectOptions } from "../createAccountForm/selectOptions";
import {
	accountTypeOpts,
	bankAccNumTypeOpts,
	blockchainOpts,
	currencyCodeOpts,
	documentTypeOpts,
	pixAccTypeOpts,
	recipientTypeOpts,
} from "./transferOptions";
import { useAccount } from "@/hooks/queries/useAccount";

interface TransferFormProps {
	onSuccess?: () => void;
}

export default function TransferForm({ onSuccess }: TransferFormProps) {
	const { toast } = useToast();
	const { data: account } = useAccount();

	const mutation = useCreateTransferMutation({
		onSuccess: () => {
			toast({
				title: "Transfer created",
				description: "Your transfer has been created successfully.",
			});
			onSuccess?.();
		},
	});

	const form = useForm<Transfer>({
		defaultValues: {
			payoutAccountId: `${account?.id}`,
			recipientsInfo: [
				{
					name: "Test",
					tokenAmount: 200000,
					email: "test@email.com",
					recipientType: "INDIVIDUAL",
					dateOfBirth: new Date().toISOString(),
					recipientTransferType: "FIAT",
					bankDetails: {
						bankName: "Test Bank",
						bankAccountOwnerName: "Test Doe",
						accountType: "CHECKING",
						pixAccountType: "PHONE",
						bankAccountNumber: "012345617314",
						bankRoutingNumber: "012345617314",
						documentNumber: "012345617314",
						documentType: "NATIONAL_ID",
						country: "USA",
						bankAccountNumberType: "CVU",
						physicalAddress: {
							address1: "adress 1",
							address2: "addess 2",
							country: "US",
							state: "Texas",
							city: "Dallas",
							zip: "75001",
						},
						currencyCode: "USD",
					},
					walletDetails: {
						walletAddress: "0x26784F19fCA8be36Bd7a6D512B3b2a07fC8813B9",
						blockchain: "ETHEREUM",
					},
				},
			] as RecipientInfo[],
		},
		onSubmit: async ({ value }) => {
			mutation.mutate(value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="flex flex-col items-center justify-between p-6 bg-white rounded-lg shadow w-full"
		>
      <h2 className="text-xl font-semibold">Transfer information</h2>
			<form.Field name="payoutAccountId">
				{(field) => {
					return (
						<FieldInput
							label="Payout account id"
							type="text"
							placeholder="Payout account id"
							name={field.name}
							value={field.state.value}
							onChange={(event) => field.handleChange(event.target.value)}
						/>
					);
				}}
			</form.Field>

			<form.Field name="recipientsInfo" mode="array">
				{(field) => {
					return (
						<div className="w-full">
							{field.state.value.map((recipient, index) => {
								return (
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									<div key={`recipient[${index}]`} className="flex flex-row gap-6 px-8 py-4 w-full">
										<div className="flex flex-col gap-2 w-1/4">
											<h2>Recipient info</h2>
											<form.Field name={`recipientsInfo[${index}].name`}>
												{(subField) => (
													<FieldInput
														label="Recipient name"
														type="text"
														placeholder="Recipient name"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field name={`recipientsInfo[${index}].tokenAmount`}>
												{(subField) => (
													<FieldInput
														label="Amount"
														type="number"
														placeholder="Amount"
														name={subField.name}
														value={subField.state.value.toString()}
														onChange={(event) =>
															subField.handleChange(Number(event.target.value))
														}
													/>
												)}
											</form.Field>
											<form.Field name={`recipientsInfo[${index}].email`}>
												{(subField) => (
													<FieldInput
														label="Email"
														type="email"
														placeholder="Email"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].recipientType`}
											>
												{(subField) => (
													<FieldSelect
														value={subField.state.value}
														label="Recipient type"
														options={selectOptions}
														onChange={(value) =>
															subField.handleChange(
																value as "INDIVIDUAL" | "BUSINESS",
															)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].recipientTransferType`}
											>
												{(subField) => (
													<FieldSelect
														value={subField.state.value}
														label="Recipient type"
														options={recipientTypeOpts}
														onChange={(value) =>
															subField.handleChange(
																value as "FIAT" | "BLOCKCHAIN",
															)
														}
													/>
												)}
											</form.Field>
										</div>

										<div className="flex flex-col gap-2 w-1/4">
											<h2>Bank details</h2>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.bankName`}
											>
												{(subField) => (
													<FieldInput
														label="Bank name"
														type="text"
														placeholder="Bank name"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.bankAccountOwnerName`}
											>
												{(subField) => (
													<FieldInput
														label="Bank account owner name"
														type="text"
														placeholder="Bank account owner name"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.accountType`}
											>
												{(subField) => (
													<FieldSelect
														value={subField.state.value}
														label="Account type"
														options={accountTypeOpts}
														onChange={(value) =>
															subField.handleChange(
																value as "CHECKING" | "SAVINGS",
															)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.pixAccountType`}
											>
												{(subField) => (
													<FieldSelect
														value={subField.state.value}
														label="Account type"
														options={pixAccTypeOpts}
														onChange={(value) =>
															subField.handleChange(
																value as
																	| "PHONE"
																	| "EMAIL"
																	| "DOCUMENT"
																	| "BANK_ACCOUNT",
															)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.bankAccountNumber`}
											>
												{(subField) => (
													<FieldInput
														label="Bank account number"
														type="number"
														placeholder="Bank account number"
														name={subField.name}
														value={subField.state.value.toString()}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.bankRoutingNumber`}
											>
												{(subField) => (
													<FieldInput
														label="Bank routing number"
														type="number"
														placeholder="Bank routing number"
														name={subField.name}
														value={subField.state.value.toString()}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.documentNumber`}
											>
												{(subField) => (
													<FieldInput
														label="Document number"
														type="number"
														placeholder="Document number"
														name={subField.name}
														value={subField.state.value.toString()}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.documentType`}
											>
												{(subField) => (
													<FieldSelect
														value={subField.state.value}
														label="Account type"
														options={documentTypeOpts}
														onChange={(value) =>
															subField.handleChange(
																value as
																	| "NATIONAL_ID"
																	| "PASSPORT"
																	| "RESIDENT_ID"
																	| "RUC",
															)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.country`}
											>
												{(subField) => (
													<FieldInput
														label="Country"
														type="text"
														placeholder="Country"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.bankAccountNumberType`}
											>
												{(subField) => (
													<FieldSelect
														value={subField.state.value}
														label="Account type"
														options={bankAccNumTypeOpts}
														onChange={(value) =>
															subField.handleChange(
																value as "CVU" | "CBU" | "ALIAS",
															)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.currencyCode`}
											>
												{(subField) => (
													<FieldSelect
														value={subField.state.value}
														label="Currency code"
														options={currencyCodeOpts}
														onChange={(value) => subField.handleChange(value)}
													/>
												)}
											</form.Field>
										</div>

										<div className="flex flex-col gap-2 w-1/4">
											<h2>Physical address</h2>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.physicalAddress.address1`}
											>
												{(subField) => (
													<FieldInput
														label="Address 1"
														type="text"
														placeholder="Address 1"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.physicalAddress.address2`}
											>
												{(subField) => (
													<FieldInput
														label="Address 2"
														type="text"
														placeholder="Address 2"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.physicalAddress.country`}
											>
												{(subField) => (
													<FieldInput
														label="Country"
														type="text"
														placeholder="Country"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.physicalAddress.state`}
											>
												{(subField) => (
													<FieldInput
														label="State"
														type="text"
														placeholder="State"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.physicalAddress.city`}
											>
												{(subField) => (
													<FieldInput
														label="City"
														type="text"
														placeholder="City"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].bankDetails.physicalAddress.zip`}
											>
												{(subField) => (
													<FieldInput
														label="Zip"
														type="text"
														placeholder="Zip"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
										</div>

										<div className="flex flex-col gap-2 w-1/4">
											<h2>Wallet details</h2>
											<form.Field
												name={`recipientsInfo[${index}].walletDetails.walletAddress`}
											>
												{(subField) => (
													<FieldInput
														label="Wallet"
														type="text"
														placeholder="Wallet"
														name={subField.name}
														value={subField.state.value}
														onChange={(event) =>
															subField.handleChange(event.target.value)
														}
													/>
												)}
											</form.Field>
											<form.Field
												name={`recipientsInfo[${index}].walletDetails.blockchain`}
											>
												{(subField) => (
													<FieldSelect
														value={subField.state.value}
														label="Account type"
														options={blockchainOpts}
														onChange={(value) =>
															subField.handleChange(
																value as "ETHEREUM" | "POLYGON",
															)
														}
													/>
												)}
											</form.Field>
										</div>
									</div>
								);
							})}
						</div>
					);
				}}
			</form.Field>

			<form.Subscribe>
				{() => {
					return (
						<Button className="w-full" type="submit" disabled={mutation.isPending}>
							{mutation.isPending ? "Creating..." : "Create transfer"}
						</Button>
					);
				}}
			</form.Subscribe>
		</form>
	);
}
