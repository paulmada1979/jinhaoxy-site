"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeLiteProps {
  videoId: string;
  title: string;
}

export default function YouTubeLite({ videoId, title }: YouTubeLiteProps) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-black">
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{ border: 0 }}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
      className="group relative w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-black cursor-pointer focus:outline-none focus:ring-4 focus:ring-orange-500/50"
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        fill
        unoptimized
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-red-600 group-hover:bg-red-700 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
          <Play size={32} className="text-white translate-x-0.5" fill="currentColor" />
        </div>
      </div>
    </button>
  );
}
