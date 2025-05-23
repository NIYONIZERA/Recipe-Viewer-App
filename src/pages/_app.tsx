// src/pages/_app.tsx
import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';
import Header from '@/components/Header';  // adjust path if needed

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Header />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

