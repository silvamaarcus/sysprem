'use client';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'hsl(250, 26%, 13%)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          Sysprem
        </Typography>
        <Button
          color="inherit"
          onClick={handleLogout}
          size="small"
          sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}
