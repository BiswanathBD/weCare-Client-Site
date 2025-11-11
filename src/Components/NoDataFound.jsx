import { TriangleAlert } from "lucide-react";
import React from "react";

const NoDataFound = () => {
  return (
    <div className="flex items-center justify-center py-10 gap-4 col-span-3 mx-auto">
      <TriangleAlert className="w-8 h-8 text-pink-400/50 animate-pulse" />
      <span className="text-xl bg-linear-to-r from-purple-500/50 to-pink-400/50 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(236,72,153,0.6)]">
        - No Data Found -
      </span>
    </div>
  );
};

export default NoDataFound;
