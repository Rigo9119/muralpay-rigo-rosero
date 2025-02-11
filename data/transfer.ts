import { createAxiosInstance } from "@/axios/instance";
import type { Transfer } from "@/utils/types";

export const createTransfer = async (data: Transfer): Promise<Transfer> => {
  try {
    const api = createAxiosInstance({ path: '/api' });
    const response = await api.post('/transfer-requests', data);

    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const getTransfer = async (id: string): Promise<Transfer> => {
  try {
    const api = createAxiosInstance({ path: '/api' });
    const response = await api.get(`/transfer-requests/${id}`);
    
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export const executeTransfer = async (data: { id: string}): Promise<Transfer> => {
  try {    
    const api = createAxiosInstance({ path: '/api', token: process.env.NEXT_PUBLIC_TRANSFER_KEY });
    const response = await api.post("/transfer-requests/execute", data);

    return response.data;
  } catch(error) {
    console.error('API Error:', error);
    throw error
  }
}