import { QueryClient, QueryFunction } from "@tanstack/react-query";
import axios from 'axios';

// Configurazione di axios
const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

async function throwIfResNotOk(res: any) {
  if (res.status >= 400) {
    const text = res.data || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<any> {
  try {
    console.log('API Request:', { method, url, data });
    const res = await api({
      method,
      url,
      data: data ? data : undefined,
    });
    console.log('API Response:', res);

    await throwIfResNotOk(res);
    return res;
  } catch (error: any) {
    console.error('API Error:', {
      error,
      message: error?.message || 'Unknown error',
      response: error?.response?.data
    });
    if (axios.isAxiosError(error)) {
      throw new Error(`${error.response?.status}: ${error.response?.data || error.message}`);
    }
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const res = await api.get(queryKey[0] as string);

      if (res.status === 401) {
        if (unauthorizedBehavior === "returnNull") {
          return null;
        } else {
          throw new Error('Unauthorized');
        }
      }

      return res.data;
    } catch (error) {
      console.error('Query error:', error);
      if (axios.isAxiosError(error) && error.response?.status === 401 && unauthorizedBehavior === "returnNull") {
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
