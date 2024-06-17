"use client";

import { RefreshCw } from "lucide-react";

const RefreshButton = () => {
  return (
    <button className=" inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 relative p-3 text-white bg-blue-500 rounded-lg focus:outline-none">
      <span className="absolute inset-0 border-2 border-transparent rounded-lg animate-rainbow-glow"></span>
      <RefreshCw className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      Refresh
    </button>
  );
};

export default RefreshButton;
