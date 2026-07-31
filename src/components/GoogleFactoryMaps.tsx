"use client";

import { useLocale } from "next-intl";

// Keyless Google Maps embeds for the home-page "Our Global Network" section.
//
// Why iframes and not the Maps JavaScript API: the JS API requires a billed
// Google Cloud API key. The `output=embed` iframe below needs no key, no
// billing and no project setup. The trade-off is that one embed can only show
// ONE pinned view — so instead of a single pin-less map of Asia we render one
// small map per production base, which matches the section copy ("production
// bases in Bac Ninh (Vietnam) and Dongguan (China)").
//
// The interactive multi-pin map (react-leaflet, `FactoryMap.tsx`) is still used
// on /contact-us/ where the full factory list matters.

interface Site {
  name: string;
  sub: string;
  /** "lat,lng" — what Google drops the pin on */
  q: string;
  zoom: number;
}

const SITES: Site[] = [
  {
    name: "Vietnam Xinyuanjia",
    sub: "Bac Ninh Province, Vietnam",
    q: "21.1861,106.0763",
    zoom: 11,
  },
  {
    name: "Dongguan Xinyuan Printing",
    sub: "Changping, Dongguan, China",
    q: "23.0489,113.8100",
    zoom: 11,
  },
];

export default function GoogleFactoryMaps({ height = "340px" }: { height?: string }) {
  const locale = useLocale();
  // Google Maps UI language — keeps labels in the visitor's locale.
  const hl = locale === "zh" ? "zh-CN" : locale === "vi" ? "vi" : "en";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {SITES.map((s) => (
        <figure
          key={s.name}
          className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white"
        >
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(s.q)}&z=${s.zoom}&hl=${hl}&output=embed`}
            title={`${s.name} — ${s.sub}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            style={{ height, width: "100%", border: 0, display: "block" }}
          />
          <figcaption className="px-4 py-3 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{s.name}</p>
            <p className="text-xs text-gray-500">{s.sub}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
