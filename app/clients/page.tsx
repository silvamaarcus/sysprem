'use client';

import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import ClientForm from '@/components/ClientForm';
import ClientTable from '@/components/ClientTable';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { type ClientSchema } from '@/schemas/clientSchema';
import { createClient, getClients, updateClient } from '@/services/clients';
import type { Client } from '@/types/client';

export default function ClientsPage() {
  const queryClient = useQueryClient();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const {
    data: clients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients,
  });

  const createMutation = useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setIsCreateOpen(false);
      setSnackbar({
        open: true,
        message: 'Cliente criado com sucesso!',
        severity: 'success',
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Erro ao criar cliente. Tente novamente.',
        severity: 'error',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string | number;
      data: Partial<ClientSchema>;
    }) => updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setEditClient(null);
      setSnackbar({
        open: true,
        message: 'Cliente atualizado com sucesso!',
        severity: 'success',
      });
    },
    onError: () => {
      setSnackbar({
        open: true,
        message: 'Erro ao atualizar cliente. Tente novamente.',
        severity: 'error',
      });
    },
  });

  const handleCreate = (data: ClientSchema) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (data: ClientSchema) => {
    if (editClient) {
      updateMutation.mutate({ id: editClient.id, data });
    }
  };

  const closeSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  if (isLoading) return <Loading fullScreen />;

  if (error) {
    return (
      <Box>
        <Header />
        <Box sx={{ p: 3 }}>
          <Alert severity="error">
            Erro ao carregar clientes. Verifique sua conexão.
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Header />

      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Clientes
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsCreateOpen(true)}
            color="primary"
          >
            Novo Cliente
          </Button>
        </Box>

        <ClientTable clients={clients ?? []} onEdit={setEditClient} />
      </Box>

      {/* Modal — Create */}
      <Modal open={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', md: '80%', lg: '70%' },
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: 'background.paper',
            border: '1px solid var(--color-border)',
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
            Novo Cliente
          </Typography>
          <ClientForm
            onSubmit={handleCreate}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createMutation.isPending}
          />
        </Box>
      </Modal>

      {/* Drawer — Edit */}
      <Drawer
        anchor="right"
        open={!!editClient}
        onClose={() => setEditClient(null)}
        slotProps={{
          paper: { sx: { width: { xs: '100%', sm: 600, md: 700 }, p: 3 } },
        }}
      >
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Editar Cliente
        </Typography>
        {editClient && (
          <ClientForm
            defaultValues={editClient}
            onSubmit={handleUpdate}
            onCancel={() => setEditClient(null)}
            isLoading={updateMutation.isPending}
          />
        )}
      </Drawer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={closeSnackbar}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
