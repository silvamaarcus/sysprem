'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'hsl(181, 39%, 55%)',
    },
    background: {
      default: 'hsl(250, 26%, 19%)',
      paper: 'hsl(250, 26%, 15%)',
    },
    text: {
      primary: 'hsl(0, 0%, 95%)',
      secondary: 'hsl(240, 5%, 64.9%)',
    },
    divider: 'hsl(240, 3.7%, 15.9%)',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'hsl(240, 3.7%, 15.9%)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: 'hsl(250, 26%, 15%)',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
        },
      },
    },
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
