import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Sidebar from '@/pages/components/Sidebar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>SRMS - Student Result Management System</title>
      </Head>
      <>
        <Sidebar />
        <Component {...pageProps} />
      </>
      <Toaster position="bottom-left" toastOptions={{ duration: 5000 }} />
    </>
  );
}
