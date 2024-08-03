import prisma from '@/lib/db';
import { formatPrice } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

async function getOrders() {
  const data = await prisma.order.findMany({
    select: {
      createdAt: true,
      status: true,
      id: true,
      amount: true,
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
  });

  return data;
}

const OrdersPage = async () => {
  const orders = await getOrders();

  return (
    <Card>
      <CardHeader className='px-7'>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <p className='font-medium'>{order.User?.firstName}</p>
                  <p className='hidden text-sm text-muted-foreground md:flex'>
                    {order.User?.email}
                  </p>
                </TableCell>
                <TableCell>Order</TableCell>
                <TableCell>{order?.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('tr-TR').format(order.createdAt)}
                </TableCell>
                <TableCell className='text-right'>
                  {formatPrice(order.amount / 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersPage;
