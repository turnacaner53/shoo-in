import prisma from '@/lib/db';

import ProductCard from './ProductCard';

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
  });

  return data;
}

export default async function FeaturedProducts() {
  const data = await getProducts();

  return (
    <>
      <h2 className='text-2xl font-extrabold tracking-tight'>Featured Items</h2>
      <div className='mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
