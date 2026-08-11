import BestSeller from "@/components/home/best-seller";
import Hero from "@/components/home/hero/index";
import About from "@/components/ui/about/About";
import Contact from "@/components/ui/contact/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <BestSeller />
      <About />
      <Contact />
    </>
  );
};

export default Home;
