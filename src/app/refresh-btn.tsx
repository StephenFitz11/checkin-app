"use client";

import { revalidateFunc } from "@/actions/revalidate-path";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const RefreshButton = ({ className }: { className?: string }) => {
  const router = useRouter();
  const isInitialRender = useRef(true);

  useEffect(() => {
    toast.success("Refreshed! Parade order up to date!");
    // Your effect logic here
  }, []);
  return (
    <button
      className={cn(
        "fixed bottom-0 left-0  inline-flex items-center justify-center gap-2 px-4 py-4 text-xs font-semibold shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 focus:outline-none w-full bg-blue-500 text-white p-4",
        className
      )}
      onClick={() => {
        revalidateFunc();
        window.location.reload();
      }}
    >
      {/* <span className="absolute inset-0 border-2 border-transparent rounded-lg "></span> */}
      <RefreshCw className="-ml-0.5 h-5 w-5" aria-hidden="true" />
      Refresh
    </button>
  );
};

export default RefreshButton;
