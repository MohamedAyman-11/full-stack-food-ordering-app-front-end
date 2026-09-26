import Categories from '@/components/home/categories';
import Hero from '@/components/home/hero/index';
import About from './about/About';
import Contact from './contact/Contact';
import BestSeller from '@/components/home/best-seller/index';

const Index = () => {
  return (
    <>
      <Hero />
      <Categories />
      <BestSeller />
      <About />
      <Contact />
    </>
  );
};

export default Index;
