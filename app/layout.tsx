import './globals.css';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import MuiThemeProvider from '@/providers/MuiThemeProvider';
import QueryProvider from '@/providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Desafio Frontend - Sysprem',
  description:
    'Desafio Frontend para vaga de Desenvolvedor Frontend na Sysprem',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MuiThemeProvider>
            <QueryProvider>{children}</QueryProvider>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
