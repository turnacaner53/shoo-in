import prisma from '@/lib/db';
import { formatPrice } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      id: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 7,
  });

  return data;
}

export default async function RecentSales() {
  const sales = await getData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-8'>
        {sales.map((sale) => (
          <div key={sale.id} className='flex items-center gap-4'>
            <Avatar className='hidden h-9 w-9 sm:flex'>
              <AvatarImage src={sale.User?.profileImage} alt='User Avatar' />
              <AvatarFallback>
                {sale.User?.firstName.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
            <div className='grid gap-1'>
              <p className='text-sm'>{sale.User?.firstName}</p>
              <p className='text-sm text-muted-foreground'>
                {sale.User?.email}
              </p>
            </div>
            <p className='ml-auto font-medium'>
              +{formatPrice(sale.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
