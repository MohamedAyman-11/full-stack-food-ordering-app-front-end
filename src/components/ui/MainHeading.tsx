interface Props {
  title: string;
  subTitle: string;
}
const MainHeading = ({ title, subTitle }: Props) => {
  return (
    <>
      <div className="text-center">
        <h2 className="text-primary font-bold text-3xl md:text-5xl mb-1">{title}</h2>
        <span className="text-sm md:text-[18px] text-accent font-medium leading-4"> {subTitle}</span>
      </div>
    </>
  );
};

export default MainHeading;
