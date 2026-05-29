import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'Nome/Razão Social é obrigatório'),
  tradeName: z.string().optional(),
  personType: z.enum(['PF', 'PJ']),
  federalTaxNumber: z.string().min(1, 'CPF/CNPJ é obrigatório'),
  stateRegistration: z.string().optional(),
  municipalRegistration: z.string().optional(),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
  creditLimit: z.number().min(0).optional(),
  financialBalance: z.number().optional(),
  creditLimitExpirationDate: z.string().optional(),
  creditRegistrationNotes: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean(),
});

export type ClientSchema = z.infer<typeof clientSchema>;
