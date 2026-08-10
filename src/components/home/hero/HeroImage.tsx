const HeroImage = () => {
  return (
    <div className="relative h-90 hidden md:block ">
      <img
        src="/images/hero.webp"
        alt="Hero image"
        className="object-contain h-full mx-auto shadow-md rounded-full "
      />
    </div>
  );
};
export default HeroImage;
