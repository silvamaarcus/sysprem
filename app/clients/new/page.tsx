'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ClientForm from '@/components/ClientForm';
import Header from '@/components/Header';
import { type ClientSchema } from '@/schemas/clientSchema';
import { createClient } from '@/services/clients';

export default function NewClientPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const mutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setSnackbar({
        open: true,
        message: 'Cliente criado com sucesso!',
        severity: 'success',
      });
      setTimeout(() => router.push('/clients'), 1500);
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Erro ao criar cliente. Tente novamente.',
        severity: 'error',
      });
    },
  });

  return (
    <Box className="border-border bg-card rounded-lg border shadow-sm">
      <Header />
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Novo Cliente
        </Typography>
        <ClientForm
          onSubmit={(data: ClientSchema) => mutation.mutate(data)}
          onCancel={() => router.push('/clients')}
          isLoading={mutation.isPending}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
