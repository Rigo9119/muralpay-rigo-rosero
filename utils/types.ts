export type CurrencyInfo = {
  currencyCode: string;
  stage: string;
  isRestricted: boolean;
  message: string;
};

export type Customer = {
  id: string;
  name: string;
  organizationType: string;
  createdAt: string;
  updateAt: string; 
  customerType: string; 
  accountId: string;
  currenciesInfo: CurrencyInfo[];
};

export type DepositAccount = {
  id: string;
  status: string;
  currency: string;
  bankBeneficiaryName: string;
  bankBeneficiaryAddress: string;
  bankName: string;
  bankAddress: string;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  paymentRails: string[];
};

export type Account = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  blockchain: string;
  address: string;
  balance: {
    balance: number;
    tokenSymbol: string;
  };
  isApiEnabled: boolean;
  isPending: boolean;
  customer: Customer;
  depositAccount: DepositAccount;
};

export type CreateAccountData = {
  name: string;
  organizationType: string;
}

export type RecipientsInfo = {
  name: string
  tokenAmount: number
  emai: string
  recipientType: "BUSINESS" | "INDIVIDUAL"
  recipientTransferType: "FIAT" | "BLOCKCHAIN"
  bankDetails: BankDetails
  walletDetails: WalletDetails
}

export type PhysicalAddress = {
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
};

export type BankDetails = {
  bankName: string;
  bankAccountOwnerName: string;
  accountType: 'CHECKING' | 'SAVINGS';
  pixAccountType: 'PHONE' | 'EMAIL' | 'DOCUMENT' | 'BANK_ACCOUNT';
  pixEmail?: string;
  pixPhone?: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  iban?: string;
  swiftBic?: string;
  branchCode?: string;
  documentNumber: string;
  documentType: 'NATIONAL_ID' | 'PASSPORT' | 'RESIDENT_ID' | 'RUC';
  country: string;
  bankAccountNumberType: 'CVU' | 'CBU' | 'ALIAS';
  physicalAddress: PhysicalAddress;
  currencyCode: string;
};

export type WalletDetails = {
  walletAddress: string;
  blockchain: 'ETHEREUM' | 'POLYGON' | 'BASE' | 'CELO';
};

export type RecipientInfo = {
  name: string;
  tokenAmount: number;
  email: string;
  dateOfBirth: `${string}T${string}Z`;
  recipientType: 'INDIVIDUAL' | 'BUSINESS';
  recipientTransferType: 'FIAT' | 'BLOCKCHAIN';
  bankDetails: BankDetails;
  walletDetails: WalletDetails;
};

export type Transfer = {
  payoutAccountId: string;
  memo?: string;
  recipientsInfo: RecipientInfo[];
  status?: string
};