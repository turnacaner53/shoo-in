import React from 'react';

import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { extractRouterConfig } from 'uploadthing/server';

import { Toaster } from '@/components/ui/toaster';

import { ourFileRouter } from './api/uploadthing/core';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShooIn',
  description: 'Shoe store for everyone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
