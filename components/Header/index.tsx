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
      className="border-border bg-background-dark border-b"
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
          onClick={handleLogout}
          size="small"
          className="border border-red-500 text-red-500 hover:bg-red-500/20"
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}
