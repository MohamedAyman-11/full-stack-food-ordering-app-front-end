import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Loading = () => {
  return (
    <div className="min-h-100 lg:min-h-125 flex items-center justify-center">
      <LoadingSpinner size="size-16" />
    </div>
  );
};

export default Loading;
