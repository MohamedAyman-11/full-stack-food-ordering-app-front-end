interface Props {
  title: string;
  subTitle: string;
}
const MainHeading = ({ title, subTitle }: Props) => {
  return (
    <>
      <span className="uppercase text-accent font-semibold leading-4">
        {subTitle}
      </span>
      <h2 className="text-primary font-bold text-4xl italic">{title}</h2>
    </>
  );
};

export default MainHeading;
