'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { type ClientSchema, clientSchema } from '@/schemas/clientSchema';
import type { Client } from '@/types/client';
import { applyCpfCnpjMask } from '@/utils/masks';

interface ClientFormProps {
  defaultValues?: Partial<Client>;
  onSubmit: (data: ClientSchema) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const EMPTY_DEFAULTS: ClientSchema = {
  name: '',
  tradeName: '',
  personType: 'PJ',
  federalTaxNumber: '',
  stateRegistration: '',
  municipalRegistration: '',
  website: '',
  creditLimit: undefined,
  financialBalance: undefined,
  creditLimitExpirationDate: '',
  creditRegistrationNotes: '',
  notes: '',
  isActive: true,
};

export default function ClientForm({
  defaultValues,
  onSubmit,
  isLoading,
}: ClientFormProps) {
  'use no memo';
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientSchema>({
    resolver: zodResolver(clientSchema),
    defaultValues: { ...EMPTY_DEFAULTS, ...defaultValues },
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        {/* ── Dados Principais ── */}
        <Grid size={12}>
          <Typography className="text-muted-foreground mt-1 mb-1 text-xs font-semibold tracking-[0.5px] uppercase">
            Dados Principais
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome / Razão Social *"
                fullWidth
                size="small"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="personType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small">
                <InputLabel>Tipo de Pessoa</InputLabel>
                <Select {...field} label="Tipo de Pessoa">
                  <MenuItem value="PJ">Pessoa Jurídica</MenuItem>
                  <MenuItem value="PF">Pessoa Física</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="federalTaxNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="CPF / CNPJ *"
                fullWidth
                size="small"
                error={!!errors.federalTaxNumber}
                helperText={errors.federalTaxNumber?.message}
                onChange={(e) =>
                  field.onChange(applyCpfCnpjMask(e.target.value))
                }
                slotProps={{ htmlInput: { maxLength: 18 } }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="tradeName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome Fantasia"
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="stateRegistration"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Inscrição Estadual"
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="municipalRegistration"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Inscrição Municipal"
                fullWidth
                size="small"
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Website"
                fullWidth
                size="small"
                error={!!errors.website}
                helperText={errors.website?.message}
              />
            )}
          />
        </Grid>

        {/* ── Informações Financeiras ── */}
        <Grid size={12}>
          <Typography className="text-muted-foreground mt-1 mb-1 text-xs font-semibold tracking-[0.5px] uppercase">
            Informações Financeiras
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="creditLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Limite de Crédito"
                fullWidth
                size="small"
                type="number"
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === ''
                      ? undefined
                      : parseFloat(e.target.value),
                  )
                }
                slotProps={{ htmlInput: { min: 0, step: 0.01 } }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="financialBalance"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Saldo Financeiro"
                fullWidth
                size="small"
                type="number"
                value={field.value ?? ''}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === ''
                      ? undefined
                      : parseFloat(e.target.value),
                  )
                }
                slotProps={{ htmlInput: { step: 0.01 } }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="creditLimitExpirationDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Validade do Limite de Crédito"
                fullWidth
                size="small"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
              />
            )}
          />
        </Grid>

        {/* ── Observações ── */}
        <Grid size={12}>
          <Typography className="text-muted-foreground mt-1 mb-1 text-xs font-semibold tracking-[0.5px] uppercase">
            Observações
          </Typography>
        </Grid>

        <Grid size={12}>
          <Controller
            name="creditRegistrationNotes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Observações de Cadastro de Crédito"
                fullWidth
                size="small"
                multiline
                rows={3}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Observações Gerais"
                fullWidth
                size="small"
                multiline
                rows={3}
              />
            )}
          />
        </Grid>

        {/* ── Status ── */}
        <Grid size={12}>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value}
                    onChange={field.onChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    Ativo
                  </Typography>
                }
              />
            )}
          />
        </Grid>

        {/* ── Actions ── */}
        <Grid size={12}>
          <Box
            sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}
          >
            <Button
              variant="outlined"
              onClick={() => router.push('/clients')}
              disabled={isLoading}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              color="primary"
            >
              {isLoading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
