import { createAxiosInstance } from "@/axios/instance";
import type { Account, CreateAccountData } from "@/utils/types";

export const createAccount = async (data: CreateAccountData): Promise<Account> => {
  try {
    const api = createAxiosInstance({ path: '/api' });
    const response = await api.post('/accounts', data);

    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getAccount = async (id: string): Promise<Account> => {
  try {
    const api = createAxiosInstance({ path: '/api' });
    const response = await api.get(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};