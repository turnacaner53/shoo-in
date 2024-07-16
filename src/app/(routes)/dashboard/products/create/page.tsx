'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ProductCreate = () => {
  const { toast } = useToast();

  return (
    <form>
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' asChild>
          <Link href='/dashboard/products'>
            <ChevronLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-xl font-semibold tracking-tight'>New Product</h1>
      </div>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Fill in the details and create of your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                type='text'
                className='w-full'
                placeholder='Enter product name'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                className='w-full'
                placeholder='Enter product description'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='price'>Price</Label>
              <Input
                id='price'
                type='number'
                className='w-full'
                placeholder='Enter product price'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='featuredProduct'>Featured Product</Label>
              <Switch id='featuredProduct' />
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='status'>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Select Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='draft'>Draft</SelectItem>
                  <SelectItem value='published'>Published</SelectItem>
                  <SelectItem value='archived'>Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Images</Label>
              <UploadDropzone
                endpoint='imageUploader'
                onClientUploadComplete={() => {
                  toast({
                    description: 'Image uploaded successfully',
                    variant: 'success',
                  });
                }}
                onUploadError={() => {
                  toast({
                    description: 'Image upload failed',
                    variant: 'destructive',
                  });
                }}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type='submit'>Create Product</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProductCreate;
