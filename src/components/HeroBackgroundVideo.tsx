"use client";

import Image from "next/image";

interface HeroBackgroundVideoProps {
  videoId: string | null | undefined;
  fallbackImage: string;
  alt?: string;
  priority?: boolean;
  imageOpacity?: number;
  videoOpacity?: number;
}

export default function HeroBackgroundVideo({
  videoId,
  fallbackImage,
  alt = "",
  priority = true,
  imageOpacity = 0.55,
  videoOpacity = 0.7,
}: HeroBackgroundVideoProps) {
  return (
    <>
      {/* Poster image — shows immediately and remains as fallback on mobile / slow networks */}
      <Image
        src={fallbackImage}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-center"
        style={{ opacity: imageOpacity }}
        sizes="100vw"
      />

      {/* YouTube background video — autoplay, muted, looped, no controls.
          Sits above the poster but below the dark overlay. */}
      {videoId && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ opacity: videoOpacity }}
          aria-hidden="true"
        >
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77vh] h-[56.25vw] min-w-full min-h-full -translate-x-1/2 -translate-y-1/2"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3`}
            title="Background video"
            allow="autoplay; encrypted-media"
            style={{ border: 0 }}
          />
        </div>
      )}
    </>
  );
}
