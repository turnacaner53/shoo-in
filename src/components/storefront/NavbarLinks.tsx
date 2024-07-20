'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const navbarLinks = [
  { id: 0, name: 'Home', href: '/' },
  { id: 1, name: 'All Products', href: '/products/all' },
  { id: 2, name: 'Men', href: '/products/men' },
  { id: 3, name: 'Women', href: '/products/women' },
  { id: 3, name: 'Kids', href: '/products/kids' },
];

const NavbarLinks = () => {
  const location = usePathname();

  return (
    <div className='ml-5 hidden items-center justify-center gap-x-4 md:flex lg:gap-x-6'>
      {navbarLinks.map((link) => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            location === link.href
              ? 'bg-primary text-white'
              : 'hover:bg-muted hover:bg-opacity-75 hover:text-primary',
            'group rounded-md p-2 font-medium',
          )}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
