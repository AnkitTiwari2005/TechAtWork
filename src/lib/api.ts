import axios from 'axios';

const BASE_URL = 'https://tech-work-mu.vercel.app';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  concern: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  emailSent: boolean;
  id: string;
}

export const submitContact = async (data: ContactPayload): Promise<ContactResponse> => {
  const response = await apiClient.post<ContactResponse>('/api/contact', data);
  return response.data;
};

export const checkHealth = async () => {
  const response = await apiClient.get('/api/health');
  return response.data;
};

export default apiClient;
