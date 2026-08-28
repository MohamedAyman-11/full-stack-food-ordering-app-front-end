import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />

      {/* Loader Card */}
      <div
        className="
          relative
          flex size-28
          items-center justify-center
          rounded-3xl
          border border-border/50
          bg-background/80
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <LoadingSpinner size="size-14" />
      </div>
    </div>
  );
};

export default Loading;
