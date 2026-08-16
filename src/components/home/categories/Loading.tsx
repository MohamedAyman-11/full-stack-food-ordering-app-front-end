import LoadingSpinner from "@/components/ui/LoadingSpinner";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-49.5 flex items-center justify-center">
      <LoadingSpinner size="size-15" />
    </div>
  );
};

export default Loading;
