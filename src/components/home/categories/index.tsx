import MainHeading from '@/components/ui/MainHeading';
import CategoryList from './CategoryList';
import SectionWrapper from '@/components/ui/SectionWrapper';

const Index = () => {
  return (
    <SectionWrapper>
      <div className="text-center mb-10">
        <MainHeading subTitle="Browse your favorites and discover something new." title="Explore Our Categories" />
      </div>
      <CategoryList />
    </SectionWrapper>
  );
};

export default Index;
