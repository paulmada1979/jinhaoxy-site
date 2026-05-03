"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export interface ContactFormProps {
  /** Used in the email subject line. e.g. "Shipping Boxes & Export Cartons" */
  pageContext: string;
  /** Optional volume / quantity field. Hide by passing `null`. */
  volume?: { label: string; placeholder?: string } | null;
  /** Optional select dropdown. Hide by passing `null`. */
  select?: { label: string; options: string[] } | null;
  /** Optional company / brand label override. Defaults to "Company". */
  companyLabel?: string;
  /** Optional message field overrides. */
  messageLabel?: string;
  messagePlaceholder?: string;
}

export default function ContactForm({
  pageContext,
  volume,
  select,
  companyLabel,
  messageLabel,
  messagePlaceholder,
}: ContactFormProps) {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      volume: String(data.get("volume") || ""),
      selectValue: String(data.get("selectValue") || ""),
      selectLabel: select?.label ?? "",
      message: String(data.get("message") || ""),
      pageContext,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      locale,
    };

    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || `Status ${res.status}`);
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-100 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {t("contactForm.successTitle")}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{t("contactForm.successDesc")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-orange-600 hover:text-orange-700"
        >
          {t("contactForm.sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-100">
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {t("contactForm.nameLabel")}
            </label>
            <input
              type="text"
              name="name"
              required
              maxLength={200}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {t("contactForm.emailLabel")}
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {(companyLabel !== undefined || volume) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                {companyLabel ?? t("contactForm.companyLabel")}
              </label>
              <input
                type="text"
                name="company"
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            {volume && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  {volume.label}
                </label>
                <input
                  type="text"
                  name="volume"
                  placeholder={volume.placeholder}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
        )}

        {select && (
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              {select.label}
            </label>
            <select
              name="selectValue"
              defaultValue={select.options[0]}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {select.options.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            {messageLabel ?? t("contactForm.messageLabel")}
          </label>
          <textarea
            name="message"
            rows={5}
            required
            maxLength={8000}
            placeholder={messagePlaceholder}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
          />
        </div>

        {status === "error" && (
          <div className="flex items-start gap-2 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <span>
              {t("contactForm.errorMessage")}
              {errorMsg && <span className="block text-xs text-red-500 mt-0.5">{errorMsg}</span>}
            </span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white rounded-md text-sm font-semibold transition-colors"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              {t("contactForm.submitting")}
            </>
          ) : (
            <>
              <Send size={14} />
              {t("contactForm.submitButton")}
            </>
          )}
        </button>
        <p className="text-xs text-gray-500 text-center">{t("contactForm.responseNote")}</p>
      </form>
    </div>
  );
}
