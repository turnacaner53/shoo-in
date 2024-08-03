import { Suspense } from 'react';

import prisma from '@/lib/db';
import { unstable_noStore as noStore } from 'next/cache';

import ProductCard, { LoadingProductCard } from './ProductCard';

async function getProducts() {
  const data = await prisma.product.findMany({
    where: { status: 'published' },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  return data;
}

export default function FeaturedProducts() {
  noStore();
  return (
    <>
      <h2 className='text-2xl font-extrabold tracking-tight'>Featured Items</h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadFeaturedProducts />
      </Suspense>
    </>
  );
}

async function LoadFeaturedProducts() {
  const data = await getProducts();

  return (
    <>
      <div className='mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

function LoadingRows() {
  return (
    <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
