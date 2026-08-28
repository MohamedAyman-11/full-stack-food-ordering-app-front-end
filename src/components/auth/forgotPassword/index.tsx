import SectionWrapper from "@/components/ui/SectionWrapper";
import ForgotPasswordForm from "./ForgotPasswordForm";

const index = () => {
  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="text-primary font-bold text-5xl italic">
          Forgot password
        </h2>
      </div>
      <ForgotPasswordForm />
    </SectionWrapper>
  );
};

export default index;
