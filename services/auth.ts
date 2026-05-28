import { AuthResponse, LoginCredentials } from '@/types/auth';

import { api } from './api';

export const login = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const { data } = await api.post<Record<string, unknown>>(
    '/auth/login',
    credentials,
  );

  // Tenta extrair o token de várias formas comuns
  const token =
    (data.token as string) ??
    (data.access_token as string) ??
    (data.accessToken as string) ??
    ((data.data as Record<string, unknown>)?.token as string);

  if (!token) {
    throw new Error('Token não encontrado na resposta da API');
  }

  return { token };
};
