import MainHeading from "../MainHeading";

const About = () => {
  return (
    <section className="best-seller section-gap">
      <div className="container">
        <div className="text-center">
          <MainHeading subTitle="OUR STORY" title="About Us" />
        </div>
        <div className="text-center mt-5 max-w-150 mx-auto space-y-4">
          <p className="text-accent leading-[1.7] text-[16px]">
            Welcome to our pizzeria, where we serve the finest pizzas made with
            the freshest ingredients. Every slice is a masterpiece, crafted with
            care to deliver the perfect balance of flavors. From classic
            favorites to unique creations, there's something for every pizza
            lover!
          </p>
          <p className="text-accent leading-[1.7] text-[16px]">
            Our passion for pizza shines through every dish. We hand-pick the
            best local ingredients and bake them to perfection, ensuring that
            every bite is delicious and satisfying. Whether you're here for a
            quick meal or a relaxed dining experience, we’ve got you covered
          </p>
          <p className="text-accent leading-[1.7] text-[16px]">
            Join us on a flavorful journey and experience the joy of pizza like
            never before. We pride ourselves on delivering great taste, quality,
            and service to make every meal memorable. Come and taste the
            difference!
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
