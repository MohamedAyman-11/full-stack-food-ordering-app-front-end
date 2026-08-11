import { Link } from "react-router-dom";
import MainHeading from "../MainHeading";

const Contact = () => {
  return (
    <section className="best-seller section-gap">
      <div className="container">
        <div className="text-center">
          <MainHeading subTitle="Don't hesitate" title="Contact us" />
        </div>
        <div className="text-center mt-4">
          <Link
            to="/"
            className="underline decoration-3 transition-all duration-300 hover:text-accent-foreground decoration-accent text-accent text-4xl font-semibold mx-auto"
          >
            +201040981737
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
