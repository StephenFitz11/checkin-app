"use client";

import { startParade } from "@/actions/start-parade";

const Btn = () => {
  return (
    <button
      type="button"
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => startParade()}
    >
      Start Parade
    </button>
  );
};

export default Btn;
