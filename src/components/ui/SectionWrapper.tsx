import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const SectionWrapper = ({ children }: Props) => {
  return (
    <section className="section-gap">
      <div className="container">{children}</div>
    </section>
  );
};

export default SectionWrapper;
