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
import { formatPrice } from '@/lib/utils';

const OrdersPage = () => {
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
            <TableRow>
              <TableCell>
                <p className='font-medium'>John Doe</p>
                <p className='hidden text-sm text-muted-foreground md:flex'>
                  john_doe@gmail.com
                </p>
              </TableCell>
              <TableCell>Sale</TableCell>
              <TableCell>Successful</TableCell>
              <TableCell>12-12-2021</TableCell>
              <TableCell className='text-right'>{formatPrice(255)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersPage;
