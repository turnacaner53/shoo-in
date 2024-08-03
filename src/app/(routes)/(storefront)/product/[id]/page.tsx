import { ShoppingBagButton } from '@/components/SubmitButton';
import FeaturedProducts from '@/components/storefront/FeaturedProducts';
import ImageSlider from '@/components/storefront/ImageSlider';
import prisma from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import { StarIcon } from 'lucide-react';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

import { addItem } from '../../bag/actions';

async function getProduct(productId: string) {
  const data = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
  });

  if (!data) return notFound();

  return data;
}

export default async function ProductDetails({
  params,
}: {
  params: { id: string };
}) {
  noStore();
  const product = await getProduct(params.id);
  const addProductToShoppingCart = addItem.bind(null, product.id);

  return (
    <>
      <div className='grid grid-cols-1 items-start gap-6 py-6 md:grid-cols-2 lg:gap-x-24'>
        <ImageSlider images={product.images} />
        <div>
          <h1 className='text-3xl font-extrabold tracking-tight text-gray-900'>
            {product.name}
          </h1>
          <p className='mt-3 text-2xl text-primary'>
            {formatPrice(product.price)}
          </p>
          <div className='mt-3 flex items-center gap-1'>
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
            <StarIcon className='h-4 w-4 fill-yellow-500 text-primary' />
          </div>
          <p className='mt-6 text-base text-gray-700'>{product.description}</p>
          <form action={addProductToShoppingCart}>
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      <div className='mt-16'>
        <FeaturedProducts />
      </div>
    </>
  );
}
