import BestSeller from "@/components/home/best-seller";
import Categories from "@/components/home/categories";
import Hero from "@/components/home/hero/index";
import About from "@/components/ui/about/About";
import Contact from "@/components/ui/contact/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      {/* <BestSeller /> */}
      <About />
      <Contact />
    </>
  );
};

export default Home;
