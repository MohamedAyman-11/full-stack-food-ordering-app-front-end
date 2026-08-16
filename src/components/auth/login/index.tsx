import LoginForm from "./LoginForm";
import SectionWrapper from "@/components/ui/SectionWrapper";
const index = () => {
  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="text-primary font-bold text-5xl italic">Login</h2>
      </div>
      <LoginForm />
    </SectionWrapper>
  );
};

export default index;
