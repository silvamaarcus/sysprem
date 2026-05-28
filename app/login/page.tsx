'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { login } from '@/services/auth';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha obrigatória'),
});

type LoginForm = z.infer<typeof loginSchema>;

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'hsl(240, 3.7%, 15.9%)',
    color: 'var(--color-foreground)',
    '& fieldset': { borderColor: 'var(--color-border)' },
    '&:hover fieldset': { borderColor: 'var(--color-primary)' },
    '&.Mui-focused fieldset': { borderColor: 'var(--color-primary)' },
  },
  '& .MuiInputLabel-root': { color: 'var(--color-muted-foreground)' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'var(--color-primary)' },
  '& .MuiFormHelperText-root': { color: 'hsl(0, 62.8%, 60%)' },
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError(null);
    try {
      const response = await login(data);
      localStorage.setItem('token', response.token);
      router.push('/clients');
    } catch (err) {
      console.error('[Login error]', err);
      setError('Credenciais inválidas. Verifique seu e-mail e senha.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          backgroundColor: 'hsl(250, 26%, 15%)',
          border: '1px solid var(--color-border)',
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: 'primary.main',
            mb: 0.5,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          Sysprem
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}
        >
          Faça login para continuar
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            {...register('email')}
            label="E-mail"
            fullWidth
            size="small"
            type="email"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={fieldSx}
          />
          <TextField
            {...register('password')}
            label="Senha"
            fullWidth
            size="small"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={fieldSx}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
            color="primary"
            sx={{ mt: 1 }}
          >
            {isSubmitting ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              'Entrar'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
