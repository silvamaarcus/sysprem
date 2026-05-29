export type PersonType = 'PF' | 'PJ';

export interface Client {
  id: string;
  publicId?: string;
  salesId?: string | null;
  name: string;
  tradeName?: string;
  personType: PersonType;
  federalTaxNumber: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  website?: string;
  creditLimit?: number;
  financialBalance?: number;
  creditLimitExpirationDate?: string;
  creditRegistrationNotes?: string;
  notes?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  deletedBy?: string | null;
  group?: unknown | null;
  addresses?: unknown[];
  contacts?: unknown[];
}

export type ClientFormData = Omit<
  Client,
  | 'id'
  | 'publicId'
  | 'salesId'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'deletedBy'
  | 'group'
  | 'addresses'
  | 'contacts'
>;
