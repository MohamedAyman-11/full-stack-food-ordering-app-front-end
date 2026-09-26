import LoadingSpinner from '@/components/ui/LoadingSpinner';

const Loading = () => {
  return (
    <div className="mx-auto min-h-86 flex items-center justify-center">
      <LoadingSpinner size="size-16" />
    </div>
  );
};

export default Loading;
