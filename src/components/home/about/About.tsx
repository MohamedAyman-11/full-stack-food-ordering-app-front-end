import MainHeading from '@/components/ui/MainHeading';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { LayersArrowDown, Pizza, Rocket } from 'lucide-react';

const About = () => {
  return (
    <SectionWrapper>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ">
        <div className="relative mx-auto w-full max-w-125">
          <div className="overflow-hidden rounded-3xl">
            <img src="/images/about-food.png" alt="Delicious food" className="h-100 w-full object-cover sm:h-120" />
          </div>

          <div className="absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-2xl bg-primary/10" />
          <div className="absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-2xl bg-primary/10" />
        </div>

        <div>
          <MainHeading subTitle="OUR STORY" title="About Us" />

          <div className="mt-6 space-y-4">
            <p className="text-accent text-[16px] leading-[1.7]">
              Welcome to our food delivery platform, where great food is just a few clicks away. From delicious pizzas
              and juicy burgers to fresh pasta and more, we bring your favorite meals from trusted restaurants straight
              to your door.
            </p>

            <p className="text-accent text-[16px] leading-[1.7]">
              We’re passionate about making food delivery simple, fast, and enjoyable. With a wide variety of meals,
              easy ordering, reliable delivery, and real-time order tracking, we make it easier for you to enjoy what
              you love, whenever you want.
            </p>

            <p className="text-accent text-[16px] leading-[1.7]">
              Whether you’re ordering a quick lunch, enjoying dinner with family, or treating yourself to something
              special, we’re here to make every order a delicious experience.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-border p-4">
              <Rocket className="mb-2 text-2xl text-primary" />
              <h3 className="font-semibold text-foreground">Fast Delivery</h3>
              <p className="mt-1 text-sm text-accent">Fresh meals delivered to your door.</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <Pizza className="mb-2 text-2xl text-primary" />
              <h3 className="font-semibold text-foreground">Great Food</h3>
              <p className="mt-1 text-sm text-accent">Your favorite meals from trusted restaurants.</p>
            </div>

            <div className="rounded-xl border border-border p-4">
              <LayersArrowDown className="mb-2 text-2xl text-primary" />
              <h3 className="font-semibold text-foreground">Easy Tracking</h3>
              <p className="mt-1 text-sm text-accent">Follow your order every step of the way.</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
