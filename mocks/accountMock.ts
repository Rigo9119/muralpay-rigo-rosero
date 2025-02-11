export const mockAccountData = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  createdAt: "2025-02-10T20:53:24.707Z",
  updatedAt: "2025-02-10T20:53:24.707Z",
  name: "string",
  blockchain: "ETHEREUM",
  address: "0x0000000000000000000000000000000000000000",
  balance: {
    balance: 0,
    tokenSymbol: "USDC"
  },
  isApiEnabled: true,
  isPending: true,
  customer: {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    createdAt: "2025-02-10T20:53:24.707Z",
    updatedAt: "2025-02-10T20:53:24.707Z",
    name: "string",
    customerType: "BUSINESS",
    status: "INACTIVE",
    accountId: "string",
    currenciesInfo: [
      {
        currencyCode: "USD",
        stage: "TOS",
        isRestricted: true,
        message: "string"
      }
    ]
  },
  depositAccount: {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    status: "ACTIVATED",
    currency: "USD",
    bankBeneficiaryName: "string",
    bankBeneficiaryAddress: "string",
    bankName: "string",
    bankAddress: "string",
    bankRoutingNumber: "string",
    bankAccountNumber: "string",
    paymentRails: ["ACH"]
  }
} as const; 