export type PersonType = 'PF' | 'PJ';

export interface Client {
  id: string | number;
  name: string;
  fantasy_name?: string;
  person_type: PersonType;
  cpf_cnpj: string;
  state_registration?: string;
  municipal_registration?: string;
  website?: string;
  credit_limit?: number;
  financial_balance?: number;
  credit_limit_expiry?: string;
  credit_notes?: string;
  general_notes?: string;
  active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type ClientFormData = Omit<Client, 'id' | 'created_at' | 'updated_at'>;
