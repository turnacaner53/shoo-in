import Link from 'next/link';

export const navbarLinks = [
  { id: 0, name: 'Home', link: '/' },
  { id: 1, name: 'All Products', link: '/poducts/all' },
  { id: 2, name: 'Men', link: '/poducts/men' },
  { id: 3, name: 'Women', link: '/poducts/women' },
];

const NavbarLinks = () => {
  return (
    <div className='ml-5 hidden items-center justify-center gap-x-4 lg:gap-x-6 md:flex'>
      {navbarLinks.map((link) => (
        <Link href={link.link} key={link.id} className='font-medium text-lg ml-8'>
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default NavbarLinks;
