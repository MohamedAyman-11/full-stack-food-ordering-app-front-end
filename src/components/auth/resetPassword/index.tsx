import SectionWrapper from "@/components/ui/SectionWrapper";
import ResetPasswordForm from "./ResetPasswordForm";

const index = () => {
  return (
    <SectionWrapper>
      <div className="text-center">
        <h2 className="text-primary font-bold text-5xl italic">
          Reset password
        </h2>
      </div>
      <ResetPasswordForm />
    </SectionWrapper>
  );
};

export default index;
