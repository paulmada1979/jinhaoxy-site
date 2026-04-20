"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

export interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ({ items, heading }: { items: FAQItem[]; heading?: string }) {
  const t = useTranslations();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">{t("faq.badge")}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0d2340] mt-2">
            {heading || t("faq.title")}
          </h2>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-lg border transition-all ${
                  isOpen ? "border-orange-300 shadow-md" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className={`text-sm md:text-base font-semibold leading-snug ${isOpen ? "text-orange-600" : "text-gray-900"}`}>
                    {item.q}
                  </span>
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isOpen ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-600"
                  }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
