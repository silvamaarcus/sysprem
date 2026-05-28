'use client';

import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import type { Client } from '@/types/client';
import { formatCpfCnpj } from '@/utils/formatCpfCnpj';

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
}

const headCellSx = {
  color: 'text.secondary',
  fontWeight: 600,
  fontSize: '0.75rem',
  textTransform: 'uppercase' as const,
  letterSpacing: 0.5,
};

export default function ClientTable({ clients, onEdit }: ClientTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        backgroundColor: 'hsl(250, 26%, 13%)',
        border: '1px solid var(--color-border)',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>Nome / Razão Social</TableCell>
            <TableCell sx={headCellSx}>CPF / CNPJ</TableCell>
            <TableCell sx={headCellSx}>Status</TableCell>
            <TableCell sx={headCellSx} align="right">
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                sx={{ color: 'text.secondary', py: 6 }}
              >
                Nenhum cliente encontrado
              </TableCell>
            </TableRow>
          ) : (
            clients.map((client) => (
              <TableRow
                key={client.id}
                hover
                sx={{ '&:last-child td': { border: 0 } }}
              >
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {client.name}
                  </Typography>
                  {client.fantasy_name && (
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary' }}
                    >
                      {client.fantasy_name}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {formatCpfCnpj(client.cpf_cnpj)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.active ? 'Ativo' : 'Inativo'}
                    size="small"
                    color={client.active ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(client)}
                    title="Editar cliente"
                    sx={{ color: 'primary.main' }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
