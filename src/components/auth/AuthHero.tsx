interface AuthHeroProps {
  heading: string;
  description: string;
}
const AuthHero = ({ heading, description }: AuthHeroProps) => {
  return (
    <section className=" hidden lg:block lg:w-1/2 h-screen relative overflow-hidden">
      <img src="/images/login.webp" aria-hidden="true" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 flex h-full items-center px-12 justify-center" aria-hidden="true">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold text-center">{heading}</h1>

          <p className="mt-5 text-[16px] font-medium text-white/60 text-center">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default AuthHero;
