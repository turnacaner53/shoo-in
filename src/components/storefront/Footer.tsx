export default function Footer() {
  return (
    <footer className='mx-auto mb-10 mt-16 max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className='border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24'>
        <p className='text-sm leading-5 text-muted-foreground'>
          &copy; {new Date().getFullYear()} ShooIn All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
