import prisma from '@/lib/db';
import { formatPrice } from '@/lib/utils';
import { DollarSign, PartyPopper, ShoppingBag, UserCircle } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

async function getData() {
  const [user, product, order] = await Promise.all([
    prisma.user.findMany({
      select: {
        id: true,
      },
    }),

    prisma.product.findMany({
      select: {
        id: true,
      },
    }),

    prisma.order.findMany({
      select: {
        amount: true,
      },
    }),
  ]);

  return { user, product, order };
}

export default async function DashboardStats() {
  const { user, product, order } = await getData();

  const totalAmount = order.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='tracking-tight'>Total Revenue</CardTitle>
          <DollarSign className='h-4 w-4 text-primary' />
        </CardHeader>
        <CardContent>
          <p className='text-2xl font-bold'>{formatPrice(totalAmount / 100)}</p>
          <p className='text-xs text-muted-foreground'>Based on 100 Charges</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='tracking-tight'>Total Sales</CardTitle>
          <ShoppingBag className='h-4 w-4 text-orange-500' />
        </CardHeader>
        <CardContent>
          <p className='text-2xl font-bold'>+{order.length}</p>
          <p className='text-xs text-muted-foreground'>Total sales on shooin</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='tracking-tight'>Total Products</CardTitle>
          <PartyPopper className='h-4 w-4 text-blue-500' />
        </CardHeader>
        <CardContent>
          <p className='text-2xl font-bold'>{product.length}</p>
          <p className='text-xs text-muted-foreground'>
            Total products created
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='tracking-tight'>Total Users</CardTitle>
          <UserCircle className='h-4 w-4 text-green-500' />
        </CardHeader>
        <CardContent>
          <p className='text-2xl font-bold'>{user.length}</p>
          <p className='text-xs text-muted-foreground'>Total users signed up</p>
        </CardContent>
      </Card>
    </div>
  );
}
