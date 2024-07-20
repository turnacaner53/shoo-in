import CategorySelection from '@/components/storefront/CategorySelection';
import FeaturedProducts from '@/components/storefront/FeaturedProducts';
import Hero from '@/components/storefront/Hero';

const StoreFrontPage = () => {
  return (
    <>
      <Hero />
      <CategorySelection />
      <FeaturedProducts />
    </>
  );
};

export default StoreFrontPage;
