"use client";

import dynamic from "next/dynamic";

const FactoryMap = dynamic(() => import("./FactoryMap"), {
  ssr: false,
  loading: () => (
    <div className="rounded-xl bg-gray-100 animate-pulse flex items-center justify-center" style={{ height: "500px" }}>
      <span className="text-sm text-gray-400">Loading map...</span>
    </div>
  ),
});

export default FactoryMap;
