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

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'hsl(240, 3.7%, 12%)',
    color: 'var(--color-foreground)',
    '& fieldset': { borderColor: 'var(--color-border)' },
    '&:hover fieldset': { borderColor: 'var(--color-primary)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
  },
  '& .MuiInputLabel-root': { color: 'var(--color-muted-foreground)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-primary)' },
  '& .MuiFormHelperText-root': { color: 'hsl(0, 62.8%, 60%)' },
};

const selectSx = {
  backgroundColor: 'hsl(240, 3.7%, 12%)',
  color: 'var(--color-foreground)',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--color-border)' },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-primary)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'var(--color-primary)',
  },
  '& .MuiSvgIcon-root': { color: 'var(--color-muted-foreground)' },
};

const sectionLabel = {
  color: 'text.secondary',
  mb: 1,
  mt: 1,
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase' as const,
  letterSpacing: 0.5,
};

const EMPTY_DEFAULTS: ClientSchema = {
  name: '',
  fantasy_name: '',
  person_type: 'PJ',
  cpf_cnpj: '',
  state_registration: '',
  municipal_registration: '',
  website: '',
  credit_limit: undefined,
  financial_balance: undefined,
  credit_limit_expiry: '',
  credit_notes: '',
  general_notes: '',
  active: true,
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
          <Typography sx={sectionLabel}>Dados Principais</Typography>
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
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="person_type"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth size="small">
                <InputLabel
                  sx={{
                    color: 'var(--color-muted-foreground)',
                    '&.Mui-focused': { color: 'var(--color-primary)' },
                  }}
                >
                  Tipo de Pessoa
                </InputLabel>
                <Select {...field} label="Tipo de Pessoa" sx={selectSx}>
                  <MenuItem value="PJ">Pessoa Jurídica</MenuItem>
                  <MenuItem value="PF">Pessoa Física</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="cpf_cnpj"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="CPF / CNPJ *"
                fullWidth
                size="small"
                error={!!errors.cpf_cnpj}
                helperText={errors.cpf_cnpj?.message}
                onChange={(e) =>
                  field.onChange(applyCpfCnpjMask(e.target.value))
                }
                slotProps={{ htmlInput: { maxLength: 18 } }}
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="fantasy_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome Fantasia"
                fullWidth
                size="small"
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="state_registration"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Inscrição Estadual"
                fullWidth
                size="small"
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="municipal_registration"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Inscrição Municipal"
                fullWidth
                size="small"
                sx={fieldSx}
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
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        {/* ── Informações Financeiras ── */}
        <Grid size={12}>
          <Typography sx={sectionLabel}>Informações Financeiras</Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="credit_limit"
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
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="financial_balance"
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
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Controller
            name="credit_limit_expiry"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Validade do Limite de Crédito"
                fullWidth
                size="small"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        {/* ── Observações ── */}
        <Grid size={12}>
          <Typography sx={sectionLabel}>Observações</Typography>
        </Grid>

        <Grid size={12}>
          <Controller
            name="credit_notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Observações de Cadastro de Crédito"
                fullWidth
                size="small"
                multiline
                rows={3}
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        <Grid size={12}>
          <Controller
            name="general_notes"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Observações Gerais"
                fullWidth
                size="small"
                multiline
                rows={3}
                sx={fieldSx}
              />
            )}
          />
        </Grid>

        {/* ── Status ── */}
        <Grid size={12}>
          <Controller
            name="active"
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
