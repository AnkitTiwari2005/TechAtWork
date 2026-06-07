import axios from 'axios';

const BASE_URL = 'https://tech-work-mu.vercel.app';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---------------------------------------------------------------------------
// Typed error classes
// ---------------------------------------------------------------------------

export class NetworkError extends Error {
  constructor(message = 'Network connection failed') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message = 'Request timed out') {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class ServerError extends Error {
  constructor(public statusCode: number, message = 'Server error') {
    super(message);
    this.name = 'ServerError';
  }
}

export class ValidationError extends Error {
  constructor(message = 'Validation failed') {
    super(message);
    this.name = 'ValidationError';
  }
}

// ---------------------------------------------------------------------------
// Response interceptor — categorises errors into typed classes
// ---------------------------------------------------------------------------

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      if (error.code === 'ECONNABORTED') throw new TimeoutError();
      throw new NetworkError();
    }
    if (error.response.status >= 500) {
      throw new ServerError(error.response.status);
    }
    if (error.response.status === 422 || error.response.status === 400) {
      throw new ValidationError(error.response.data?.message);
    }
    throw error;
  }
);

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

export const submitContact = async (data: ContactPayload): Promise<ContactResponse> => {
  const response = await apiClient.post<ContactResponse>('/api/contact', data);
  return response.data;
};

/**
 * Lightweight health probe with a dedicated 3-second timeout.
 * Returns `true` when the server is reachable, `false` otherwise.
 */
export const checkHealth = async (): Promise<boolean> => {
  try {
    await apiClient.get('/api/health', { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
};

export default apiClient;
