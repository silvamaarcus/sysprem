import { Client, ClientFormData } from '@/types/client';

import { api } from './api';

const sanitizePayload = (
  client: Partial<ClientFormData>,
): Partial<ClientFormData> => ({
  ...client,
  ...(client.federalTaxNumber !== undefined && {
    federalTaxNumber: client.federalTaxNumber.replace(/\D/g, ''),
  }),
});

export const getClients = async (): Promise<Client[]> => {
  const { data } = await api.get<Client[]>('/clients');
  return data;
};

export const createClient = async (client: ClientFormData): Promise<Client> => {
  const { data } = await api.post<Client>('/clients', sanitizePayload(client));
  return data;
};

export const updateClient = async (
  id: string | number,
  client: Partial<ClientFormData>,
): Promise<Client> => {
  const { data } = await api.patch<Client>(
    `/clients/${id}`,
    sanitizePayload(client),
  );
  return data;
};
