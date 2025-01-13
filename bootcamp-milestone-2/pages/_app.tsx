import React from 'react';
import { AppProps } from 'next/app';
import '../src/styles/globals.css';
import Navbar from '../src/components/navbar';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Navbar />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default MyApp;