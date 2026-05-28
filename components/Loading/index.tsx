'use client';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingProps {
  fullScreen?: boolean;
}

export default function Loading({ fullScreen = false }: LoadingProps) {
  if (fullScreen) {
    return (
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
