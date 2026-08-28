import LoadingSpinner from "@/components/ui/LoadingSpinner";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-100 lg:min-h-125 flex items-center justify-center">
      <LoadingSpinner size="size-20" />
    </div>
  );
};

export default Loading;
