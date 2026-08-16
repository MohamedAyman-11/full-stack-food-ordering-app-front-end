interface Props {
  image: string;
}
const HeroImage = ({ image }: Props) => {
  return (
    <div className="relative h-180 hidden md:block mx-auto">
      <img
        src={image}
        alt="Hero image"
        className="object-contain h-full mx-aut select-none"
      />
    </div>
  );
};
export default HeroImage;
