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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'hsl(240, 3.7%, 12%)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'hsl(240, 3.7%, 15.9%)',
          },
          '&:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
            borderColor: 'hsl(181, 39%, 55%)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'hsl(181, 39%, 55%)',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'hsl(240, 5%, 64.9%)',
          '&.Mui-focused': {
            color: 'hsl(181, 39%, 55%)',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          '&.Mui-error': {
            color: 'hsl(0, 62.8%, 60%)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: 'hsl(240, 5%, 64.9%)',
        },
      },
    },
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
