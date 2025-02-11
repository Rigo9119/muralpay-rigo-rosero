import axios from "axios"

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_DEV_KEY;

interface AxiosConfig {
  path?: string;
  token?: string;
}

export const createAxiosInstance = ({ path = "", token = apiKey }: AxiosConfig = {}) => {
  if (!apiKey) {
    console.error('API key is not defined in environment variables');
  }

  const instance = axios.create({
    baseURL: `${apiUrl}${path}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};
