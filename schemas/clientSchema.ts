import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, 'Nome/Razão Social é obrigatório'),
  fantasy_name: z.string().optional(),
  person_type: z.enum(['PF', 'PJ']),
  cpf_cnpj: z.string().min(1, 'CPF/CNPJ é obrigatório'),
  state_registration: z.string().optional(),
  municipal_registration: z.string().optional(),
  website: z.string().url('URL inválida').optional().or(z.literal('')),
  credit_limit: z.number().min(0).optional(),
  financial_balance: z.number().optional(),
  credit_limit_expiry: z.string().optional(),
  credit_notes: z.string().optional(),
  general_notes: z.string().optional(),
  active: z.boolean(),
});

export type ClientSchema = z.infer<typeof clientSchema>;
