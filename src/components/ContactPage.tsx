import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import FactoryMap from "./FactoryMapLoader";
import type { PageData } from "./PageRenderer";

const FACTORY_LOCATIONS = [
  {
    name: "Dongguan Xinyuan Printing",
    country: "China",
    city: "Changping, Dongguan",
    address: "Changping District, Dongguan, Guangdong, China",
  },
  {
    name: "Vietnam Xinyuanjia",
    country: "Vietnam",
    city: "Bac Ninh",
    address: "Bac Ninh Province, Vietnam",
  },
  {
    name: "XinYuan Packing",
    country: "China",
    city: "Dongguan",
    address: "Dongguan, Guangdong, China",
  },
];

export default function ContactPage({ page }: { page: PageData }) {
  const t = useTranslations();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0d2340] to-[#1a3659] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">
            {t("contact.badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            {page.title.replace("Conctact", "Contact")}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t("contact.heroDesc")}
          </p>
        </div>
      </section>

      {/* Contact details + form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info side */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("contact.connect")}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t("contact.email")}</h3>
                  <a href="mailto:info@jinhaoxy.com" className="text-orange-600 text-sm hover:text-orange-700">
                    info@jinhaoxy.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t("contact.phone")}</h3>
                  <p className="text-gray-600 text-sm">{t("contact.phoneDesc")}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 hover:border-orange-300 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{t("contact.hours")}</h3>
                  <p className="text-gray-600 text-sm">{t("contact.hoursDesc")}</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mt-10 mb-4">{t("contact.locations")}</h3>
            <div className="space-y-3">
              {FACTORY_LOCATIONS.map((f) => (
                <div key={f.name} className="flex items-start gap-3">
                  <MapPin size={16} className="text-orange-500 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{f.name} <span className="text-gray-500 font-normal">— {f.country}</span></p>
                    <p className="text-xs text-gray-500">{f.address}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form side */}
          <div className="bg-gray-50 rounded-xl p-6 lg:p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("contact.sendMessage")}</h2>
            <form className="space-y-4" action="mailto:info@jinhaoxy.com" method="post" encType="text/plain">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t("contact.formName")} *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">{t("contact.formEmail")} *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t("contact.formCompany")}</label>
                <input
                  type="text"
                  name="company"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t("contact.formProduct")}</label>
                <select
                  name="product"
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option>{t("home.catCorrugatedTitle")}</option>
                  <option>{t("home.catGiftTitle")}</option>
                  <option>{t("home.catFoldingTitle")}</option>
                  <option>{t("home.catLabelsTitle")}</option>
                  <option>{t("home.catEcoTitle")}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">{t("contact.formMessage")} *</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder={t("contact.formMessagePlaceholder")}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-sm font-semibold transition-colors"
              >
                <Send size={14} />
                {t("contact.formSubmit")}
              </button>
              <p className="text-xs text-gray-500 text-center">
                {t("contact.formReply")}
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-widest">{t("contact.mapBadge")}</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              {t("contact.mapTitle")}
            </h2>
            <p className="text-gray-600 mt-3">
              {t("contact.mapDesc")}
            </p>
          </div>
          <FactoryMap height="500px" />
        </div>
      </section>
    </div>
  );
}
