import { ReactNode } from 'react';

import DashboardNavigation from '@/components/dashboard/DashboardNavigation';
import { CircleUser, MenuIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8'>
      <header className='sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white'>
        <nav className='hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
          <DashboardNavigation />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              className='shrink-0 md:hidden'
              variant='outline'
              size='icon'
            >
              <MenuIcon className='h-5 w-5' />
            </Button>
          </SheetTrigger>
          <SheetContent side='left'>
            <nav className='flex flex-col gap-6 text-lg font-medium'>
              <DashboardNavigation />
            </nav>
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' size='icon' className='rounded-full'>
              <CircleUser className='h-5 w-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {children}
    </div>
  );
};

export default DashboardLayout;
