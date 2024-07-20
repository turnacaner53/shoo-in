import React, { type ReactNode } from 'react';

import Navbar from '@/components/storefront/Navbar';
import Footer from '@/components/storefront/Footer';

interface StoreFrontLayoutProps {
  children: ReactNode;
}

const StoreFrontLayout: React.FC<StoreFrontLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='m-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>{children}</main>
      <Footer />
    </>
  );
};

export default StoreFrontLayout;