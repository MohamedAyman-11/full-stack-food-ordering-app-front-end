import LoadingSpinner from '../ui/LoadingSpinner';

const Loading = () => {
  return (
    <section className="flex-1 best-seller section-gap flex items-center justify-center min-h-[60vh]">
      <div className="container">
        <LoadingSpinner size="size-20" />
      </div>
    </section>
  );
};

export default Loading;
