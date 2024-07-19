import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center gap-3'>
      <Spinner size='large' className='text-primary'>
        <span className='mt-4 text-3xl text-primary'>Loading...</span>
      </Spinner>
    </div>
  );
}
