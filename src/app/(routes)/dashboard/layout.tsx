import { ReactNode } from 'react';

import DashboardNavigation from '@/components/dashboard/DashboardNavigation';
import {
  LogoutLink,
  getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server';
import { CircleUser, MenuIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

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

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) return redirect('/');

  return (
    <div className='mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8'>
      <header className='sticky top-0 mb-2 flex h-16 items-center justify-between gap-4 border-b bg-white md:mb-4'>
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
            <DropdownMenuItem asChild>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      {children}
    </div>
  );
};

export default DashboardLayout;
