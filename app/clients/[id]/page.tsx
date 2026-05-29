'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import ClientForm from '@/components/ClientForm';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { type ClientSchema } from '@/schemas/clientSchema';
import { getClientById, updateClient } from '@/services/clients';

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const id = params.id as string;

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const {
    data: client,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['clients', id],
    queryFn: () => getClientById(id),
  });

  const mutation = useMutation({
    mutationFn: (data: Partial<ClientSchema>) => updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setSnackbar({
        open: true,
        message: 'Cliente atualizado com sucesso!',
        severity: 'success',
      });
      setTimeout(() => router.push('/clients'), 1500);
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Erro ao atualizar cliente. Tente novamente.',
        severity: 'error',
      });
    },
  });

  if (isLoading) return <Loading fullScreen />;

  if (error || !client) {
    return (
      <Box>
        <Header />
        <Box sx={{ p: 3 }}>
          <Alert severity="error">Cliente não encontrado.</Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Editar Cliente
        </Typography>
        <ClientForm
          defaultValues={client}
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
