'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';

import { editProduct } from '@/app/(routes)/dashboard/products/actions';
import { categories } from '@/lib/categories';
import { UploadDropzone } from '@/lib/uploadthing';
import { productSchema } from '@/lib/zodSchemas';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { type $Enums } from '@prisma/client';
import { ChevronLeft, XIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import FormErrorMessage from '../FormErrorMessage';
import SubmitButton from '../SubmitButton';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';

interface iAppProps {
  data: {
    id: string;
    name: string;
    description: string;
    status: $Enums.ProductStatus;
    price: number;
    images: string[];
    category: $Enums.Category;
    isFeatured: boolean;
  };
}

const EditForm = ({ data }: iAppProps) => {
  const { toast } = useToast();
  const [lastResult, action] = useFormState(editProduct, undefined);
  const [images, setImages] = useState<string[]>(data.images);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
    onSubmit: () => {
      toast({
        description: 'Product updated successfully',
        variant: 'success',
      });
    },
  });

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <input type='hidden' name='productId' value={data.id} />
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' asChild>
          <Link href='/dashboard/products'>
            <ChevronLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-xl font-semibold tracking-tight'>Edit Product</h1>
      </div>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>
            Update of your product - {data.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='name'>Name</Label>
              <Input
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={data.name}
                id='name'
                type='text'
                className='w-full'
                placeholder='Enter product name'
              />
              <FormErrorMessage>{fields.name.errors}</FormErrorMessage>
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={data.description}
                id='description'
                className='w-full'
                placeholder='Enter product description'
              />
              <FormErrorMessage>{fields.description.errors}</FormErrorMessage>
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='price'>Price</Label>
              <Input
                key={fields.price.key}
                name={fields.price.name}
                defaultValue={data.price}
                id='price'
                type='number'
                className='w-full'
                placeholder='Enter product price'
              />
              <FormErrorMessage>{fields.price.errors}</FormErrorMessage>
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='featuredProduct'>Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultChecked={data.isFeatured}
                id='featuredProduct'
              />
              <FormErrorMessage>{fields.isFeatured.errors}</FormErrorMessage>
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='status'>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={data.status}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='draft'>Draft</SelectItem>
                  <SelectItem value='published'>Published</SelectItem>
                  <SelectItem value='archived'>Archived</SelectItem>
                </SelectContent>
              </Select>
              <FormErrorMessage>{fields.status.errors}</FormErrorMessage>
            </div>
            <div className='flex flex-col gap-3'>
              <Label htmlFor='category'>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={data.category}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select Category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormErrorMessage>{fields.category.errors}</FormErrorMessage>
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Images</Label>
              <input
                type='hidden'
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={data.images as any}
                value={images}
              />
              {images.length > 0 ? (
                <div className='flex gap-4'>
                  {images.map((image, index) => (
                    <div className='relative h-[100px] w-[100px]' key={index}>
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt='product image'
                        className='h-full w-full rounded-lg border object-cover'
                      />
                      <button
                        onClick={(e) => handleDelete(e, index)}
                        className='absolute -right-3 -top-3 rounded-md bg-red-400 p-2 hover:bg-red-600'
                      >
                        <XIcon className='h-3.5 w-3.5' />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint='imageUploader'
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url));
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
              )}
              <FormErrorMessage>{fields.images.errors}</FormErrorMessage>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton buttonText='Edit Product' />
        </CardFooter>
      </Card>
    </form>
  );
};

export default EditForm;
