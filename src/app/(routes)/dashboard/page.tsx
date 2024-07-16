import { formatPrice } from '@/lib/utils';
import { DollarSign, PartyPopper, ShoppingBag, UserCircle } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Dashboard = () => {
  return (
    <>
      <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='tracking-tight'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-primary' />
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>{formatPrice(1000)}</p>
            <p className='text-xs text-muted-foreground'>
              Based on 100 Charges
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='tracking-tight'>Total Sales</CardTitle>
            <ShoppingBag className='h-4 w-4 text-orange-500' />
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>+50</p>
            <p className='text-xs text-muted-foreground'>
              Total sales on shooin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='tracking-tight'>Total Products</CardTitle>
            <PartyPopper className='h-4 w-4 text-blue-500' />
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>37</p>
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
            <p className='text-2xl font-bold'>122</p>
            <p className='text-xs text-muted-foreground'>
              Total users signed up
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='mt-10 grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
        <Card className='xl:col-span-2'>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Recent transactions from your store
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-8'>
            <div className='flex items-center gap-4'>
              <Avatar className='hidden h-9 w-9 sm:flex'>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <p className='text-sm'>John Doe</p>
                <p className='text-sm text-muted-foreground'>
                  john_doe@gmail.com
                </p>
              </div>
              <p className='ml-auto font-medium'>+{formatPrice(1999)}</p>
            </div>
            <div className='flex items-center gap-4'>
              <Avatar className='hidden h-9 w-9 sm:flex'>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <p className='text-sm'>John Doe</p>
                <p className='text-sm text-muted-foreground'>
                  john_doe@gmail.com
                </p>
              </div>
              <p className='ml-auto font-medium'>+{formatPrice(1999)}</p>
            </div>
            <div className='flex items-center gap-4'>
              <Avatar className='hidden h-9 w-9 sm:flex'>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <p className='text-sm'>John Doe</p>
                <p className='text-sm text-muted-foreground'>
                  john_doe@gmail.com
                </p>
              </div>
              <p className='ml-auto font-medium'>+{formatPrice(1999)}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
