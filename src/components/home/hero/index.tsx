import HeroImage from "./HeroImage";
import Text from "./Text";

const Hero = () => {
  return (
    <section className="section-gap">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center ">
          <Text />
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
