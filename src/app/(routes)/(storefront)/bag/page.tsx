import { DeleteButton } from '@/components/SubmitButton';
import { Cart } from '@/lib/interfaces';
import { redis } from '@/lib/redis';
import { formatPrice } from '@/lib/utils';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { deleteItem } from './actions';

export default async function BagPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) redirect('/');

  const cart: Cart | null = await redis.get(`cart-${user.id}`);

  let totalPrice = 0;

  cart?.items.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return (
    <div className='mx-auto mt-10 min-h-[55vh] max-w-2xl'>
      {cart?.items.length === 0 ? (
        <div className='mt-20 flex min-h-[400px] flex-col items-center justify-center rounded-lg border-dashed p-8 text-center'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
            <ShoppingBag className='h-10 w-10 text-primary' />
          </div>

          <h2 className='font mt-6 text-xl font-semibold'>
            You dont have any products in your cart
          </h2>
          <p className='text-md mx-auto mb-8 mt-2 max-w-sm text-center leading-6 text-muted-foreground'>
            Start shopping and add items to your cart. Your items will be saved
            here for you to checkout later.
          </p>

          <Button asChild className='capitalize' size='lg'>
            <Link href='/'>Shop Now!</Link>
          </Button>
        </div>
      ) : (
        <div className='flex flex-col gap-y-8'>
          {cart?.items.map((item) => (
            <div
              key={item.id}
              className='flex rounded-md border bg-gray-100 p-2 duration-200 hover:bg-blue-400/20'
            >
              <div className='relative h-24 w-24 sm:h-32 sm:w-32'>
                <Image
                  src={item.imageString}
                  alt='Product Image'
                  fill
                  className='rounded-md object-cover'
                />
              </div>
              <div className='ml-5 flex w-full justify-between font-medium'>
                <p>{item.name}</p>
                <div className='flex h-full flex-col items-end justify-between'>
                  <div className='flex items-center gap-x-2'>
                    <p>{item.quantity} X </p>
                    <p>{formatPrice(item.price)}</p>
                  </div>
                  <form action={deleteItem}>
                    <input type='hidden' name='productId' value={item.id} />
                    <DeleteButton />
                  </form>
                </div>
              </div>
            </div>
          ))}

          <div className='mt-10'>
            <div className='flex items-center justify-between font-medium'>
              <p>SubTotal</p>
              <p className='text-primary'>{formatPrice(totalPrice)}</p>
            </div>

            <Button size='lg' className='mt-4 w-full'>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
