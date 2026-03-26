import { Platform } from 'react-native';

const BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3001',
  default: 'http://localhost:3001',
});

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export async function apiClient<T>(path: string, options: RequestOptions = {}): Promise<T | undefined> {
  try {
  const { body, headers, ...rest } = options;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    throw new Error('failed to fetch subscriptions');
  }
  return res.json() as Promise<T>;
    
  } catch (error) {
    console.log(error)
    
  }

}
