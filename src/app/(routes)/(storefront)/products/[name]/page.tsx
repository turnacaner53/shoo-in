import ProductCard from '@/components/storefront/ProductCard';
import prisma from '@/lib/db';
import { notFound } from 'next/navigation';

async function getData(productCategory: string) {
  switch (productCategory) {
    case 'all': {
      const data = await prisma.product.findMany({
        where: { status: 'published' },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          description: true,
        },
      });

      return { title: 'All Products', data: data };
    }
    case 'men': {
      const data = await prisma.product.findMany({
        where: { status: 'published', category: 'men' },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          description: true,
        },
      });

      return { title: 'Products for Men', data: data };
    }
    case 'women': {
      const data = await prisma.product.findMany({
        where: { status: 'published', category: 'women' },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          description: true,
        },
      });

      return { title: 'Products for Women', data: data };
    }
    case 'kids': {
      const data = await prisma.product.findMany({
        where: { status: 'published', category: 'kids' },
        select: {
          id: true,
          name: true,
          price: true,
          images: true,
          description: true,
        },
      });

      return { title: 'Products for Kids', data: data };
    }

    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  const data = await getData(params.name);

  return (
    <section>
      <h1 className='my-4 text-3xl font-semibold'>{data.title}</h1>
      {data.data.length === 0 && (
        <p className='text-lg'>
          No products added for this category at this moment.{' '}
        </p>
      )}
      <div className='grid gap-5 md:grid-cols-2 lg:grid-cols-3'>
        {data.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
