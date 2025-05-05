'use client';

import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '@/context/AuthContext';
import { CustomerProvider } from '@/context/CustomerContent';
import Navbar from '@/components/common/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CustomerProvider>
              <Navbar />
              {children}
              <ToastContainer />
            </CustomerProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}