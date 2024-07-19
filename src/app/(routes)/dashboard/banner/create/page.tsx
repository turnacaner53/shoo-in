'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';

import FormErrorMessage from '@/components/FormErrorMessage';
import SubmitButton from '@/components/SubmitButton';
import { UploadDropzone } from '@/lib/uploadthing';
import { bannerSchema } from '@/lib/zodSchemas';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
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
import { useToast } from '@/components/ui/use-toast';

import { createBanner } from '../actions';

const BannerCreate = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(createBanner, undefined);
  const { toast } = useToast();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: bannerSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className='flex items-center gap-x-4'>
        <Button variant='outline' size='icon' asChild>
          <Link href='/dashboard/banners'>
            <ChevronLeft className='h-4 w-4' />
          </Link>
        </Button>
        <h1 className='text-xl font-semibold tracking-tight'>New Banner</h1>
      </div>

      <Card className='mt-4'>
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>Create your banner</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-y-6'>
            <div className='flex flex-col gap-3'>
              <Label>Name</Label>
              <Input
                type='text'
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder='Enter title for Banner'
              />
              <FormErrorMessage>{fields.title.errors}</FormErrorMessage>
            </div>
            <div className='flex flex-col gap-3'>
              <Label>Images</Label>
              <input
                type='hidden'
                name={fields.imageString.name}
                key={fields.imageString.name}
                defaultValue={fields.imageString.initialValue}
                value={image}
              />
              {image !== undefined ? (
                <Image
                  src={image}
                  alt='Banner Image'
                  width={200}
                  height={200}
                  className='h-[200px] w-[200px] rounded-lg border object-cover'
                />
              ) : (
                <UploadDropzone
                  endpoint='bannerImageRoute'
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                  }}
                  onUploadError={() => {
                    toast({
                      title: 'Image Upload Error',
                      variant: 'destructive',
                    });
                  }}
                />
              )}
              <FormErrorMessage>{fields.imageString.errors}</FormErrorMessage>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton buttonText='Create Banner' />
        </CardFooter>
      </Card>
    </form>
  );
};

export default BannerCreate;
