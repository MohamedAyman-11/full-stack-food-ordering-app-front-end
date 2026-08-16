import SectionWrapper from "@/components/ui/SectionWrapper";
import RegisterForm from "./RegisterForm";

const index = () => {
  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="text-primary font-bold text-5xl italic">Register</h2>
      </div>
      <RegisterForm />
    </SectionWrapper>
  );
};

export default index;
