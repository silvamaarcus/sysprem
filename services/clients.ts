import { Client, ClientFormData } from '@/types/client';

import { api } from './api';

export const getClients = async (): Promise<Client[]> => {
  const { data } = await api.get<Client[]>('/clients');
  return data;
};

export const createClient = async (client: ClientFormData): Promise<Client> => {
  const { data } = await api.post<Client>('/clients', client);
  return data;
};

export const updateClient = async (
  id: string | number,
  client: Partial<ClientFormData>,
): Promise<Client> => {
  const { data } = await api.put<Client>(`/clients/${id}`, client);
  return data;
};
