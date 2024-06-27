import SecondaryButton from "@/components/common/ui/SecondaryButton";
import { useTranslations } from "next-intl";
import LandingNavBar from "./components/LandingNavBar";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { LOCALES } from "@/i18n/config";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import SelectAccount from "./components/SelectAccount";

type Props = {
  params: {
    lang: string;
  };
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const t = await getTranslations({ lang, namespace: "LandingMetadata" });

  return {
    title: t("title"),
    description: t("description"),
    icons: ["/sulala-logo.svg"],
    openGraph: {
      images: ["/sulala-logo.svg"],
      title: t("title"),
    },
  };
}

export default function Landing({ params: { lang } }: Props) {
  unstable_setRequestLocale(lang);
  const t = useTranslations("Landing");

  return (
    <div className="overflow-hidden">
      <LandingNavBar lang={lang} />

      <section className="min-h-screen min-w-screen bg-gradient-to-b relative from-primary to-primary/50 text-white grid grid-cols-1 md:grid-cols-2">
        <div className="h-full flex flex-col justify-between md:justify-center gap-12 py-24 md:py-4 items-center z-20 md:z-auto">
          <div className="flex flex-row justify-center items-center gap-3 ">
            <Image
              src="/sulala-logo-white.svg"
              alt=""
              className="w-12 md:w-16 aspect-square"
              width={64}
              height={64}
            />
            <h1 className="font-semibold text-4xl md:text-5xl font-serif space-x-2">
              {t("sulala")}
            </h1>
          </div>
          <div className="w-11/12 md:w-2/3 text-center">
            <p className="text-2xl md:text-3xl font-semibold font-serif">
              {t("hero_title")}
            </p>
          </div>
          <div className="w-2/3 text-center hidden md:block">
            <p className="text-xl font-normal font-serif">
              {t("hero_description")}
            </p>
          </div>
          <div>
            <SecondaryButton
              name={t("hero_button")}
              href="#get-started"
              padding="md"
            />
          </div>
        </div>
        <div
          className={`h-full absolute -top-16 md:top-auto z-10 md:relative md:z-auto opacity-20 md:opacity-100 ${lang == "en" ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-black/60 to-black/0 flex flex-col justify-center`}
        >
          <Image
            src="/mockups/iphone-mac-product-mockup.png"
            alt=""
            width={900}
            height={900}
          />
        </div>
      </section>

      <section className="min-h-screen min-w-screen bg-white grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-3 z-20 md:z-auto p-5 md:p-auto flex flex-row justify-end items-center gap-14 bg-gradient-to-r from-white to-primary/15">
          <div className="text-primary w-full md:w-2/3 text-center font-serif text-xl md:text-3xl font-semibold">
            <p>{t("explore_the_power_of_sulala")}</p>
          </div>
        </div>
        <div className="md:col-span-2 absolute z-10 md:relative md:z-auto h-full opacity-20 md:opacity-100 flex flex-col justify-center items-center object-fill bg-gradient-to-r from-primary/15 to-primary/0">
          <Image
            src="/mockups/family-tree-portrait.png"
            alt=""
            className="w-9/12 md:w-5/12 aspect-auto"
            width={900}
            height={900}
          />
        </div>
      </section>

      <section className="min-h-screen min-w-screen bg-white grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2 absolute z-10 md:relative md:z-auto h-full opacity-20 md:opacity-100 flex flex-col justify-center items-center object-fill bg-gradient-to-r from-primary/15 to-primary/0">
          <Image
            src="/mockups/scroll-portrait.png"
            alt=""
            className="w-5/12 aspect-auto"
            width={900}
            height={900}
          />
        </div>
        <div className="md:col-span-3 z-20 md:z-auto p-5 md:p-auto flex flex-col justify-center items-start gap-14 bg-gradient-to-r from-white to-primary/15">
          <h3 className="font-semibold text-primary text-3xl font-serif">
            {t("what_we_provide")}
          </h3>
          <ul className="flex flex-col gap-4">
            <li className="flex flex-row gap-2">
              <img
                src="/icons/shopping_bag_active.svg"
                alt=""
                className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]"
              />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">
                  {t("animal_dedicated_product_title")}
                </h6>
                <p className="text-black text-sm italic">
                  {t("animal_dedicated_product_description")}
                </p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img
                src="/icons/medical_services_active.svg"
                alt=""
                className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]"
              />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">
                  {t("packages_title")}
                </h6>
                <p className="text-black text-sm italic">
                  {t("packages_description")}
                </p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img
                src="/icons/truck_active.svg"
                alt=""
                className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]"
              />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">
                  {t("auto_delivery_title")}
                </h6>
                <p className="text-black text-sm italic">
                  {t("auto_delivery_description")}
                </p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img
                src="/icons/command_active.svg"
                alt=""
                className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]"
              />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">
                  {t("scheduled_delivery_title")}
                </h6>
                <p className="text-black text-sm italic">
                  {t("scheduled_delivery_description")}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section
        id="get-started"
        className="min-h-screen min-w-screen relative bg-[url('/landing.png')] bg-cover bg-center text-white flex flex-row justify-end items-stretch gap-8"
      >
        <div
          className={`w-full md:w-6/12 flex justify-center items-center flex-col gap-8 ${lang == "en" ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-transparent to-primary via-primary/50`}
        >
          <h2 className="font-bold text-4xl text-white">
            {t("get_started_today")}
          </h2>
          <SelectAccount />
        </div>
      </section>

      <footer className="bg-primary w-full flex flex-col items-center">
        {/* FOOTER SUBTOPICS */}
        <div className="grid grid-cols-2 md:grid-cols-5 p-4 gap-3 md:gap-0 md:w-2/3">
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">
              {t("increase_your_productivity")}
            </h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("streamline_your_operations")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("automate_your_sales")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("increase_your_average_order_value")}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">
              {t("promote_your_products")}
            </h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("get_your_branding_in_the_headlines")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("craft_your_marketing_strategy")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("utilize_marketplace_analytics")}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">
              {t("track_your_delivery")}
            </h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("real_time_order_tracking")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("transparent_delivery_process")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("multiple_payment_options")}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">
              {t("connect_with_buyers")}
            </h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("personalized_customer_service")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("community_building")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("build_your_brand_story")}
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">
              {t("get_support")}
            </h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("dedicated_help_center")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("24/7_customer_support")}
              </li>
              <li className="text-white text-[7px] md:text-[10px] italic">
                {t("community_forums")}
              </li>
            </ul>
          </div>
        </div>
        {/* SOCIAL MEDIA LINKS */}
        <div className="flex flex-row gap-6 justify-center my-3 w-full">
          <img
            src="/icons/social_media/facebook.svg"
            alt=""
            className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all"
          />
          <img
            src="/icons/social_media/instagram.svg"
            alt=""
            className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all"
          />
          <img
            src="/icons/social_media/telegram.svg"
            alt=""
            className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all"
          />
          <img
            src="/icons/social_media/email.svg"
            alt=""
            className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all"
          />
          <img
            src="/icons/social_media/youtube.svg"
            alt=""
            className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all"
          />
        </div>
        {/* LANGUAGE LIST */}
        <div className="flex flex-row gap-6 justify-center w-full my-3 text-sm text-white bg-primary">
          <p>English</p>
          <p>عربي</p>
        </div>
        {/* COPY RIGHT */}
        <div className="flex flex-col justify-start items-center gap-0 pt-3 border-t border-white/10 w-full">
          <div className="flex flex-row gap-3">
            <img src="/sulala-logo-white.svg" alt="" className="w-6" />
            {/* <p className="font-thin font-serif text-xs md:text-sm">sulala.com</p> */}
            <p className="font-thin font-serif text-xs md:text-sm">
              {t("copyright")}
            </p>
          </div>
          <div className="flex flex-row gap-0">
            {/* TERMS AND COND */}
            <Link
              href="/legal/terms-and-conditions"
              className="flex flex-row gap-6 justify-center items-center w-full text-[10px] text-secondary min-w-[200px] font-mono"
            >
              <p>{t("terms_and_conditions")}</p>
              <img
                src="/icons/external-link.svg"
                alt=""
                className="w-[10px] aspect-square"
              />
            </Link>
            {/* VENDOR AGR */}
            <Link
              href="/legal/vendor-agreement"
              className="flex flex-row gap-6 justify-center items-center w-full my-3 text-[10px] text-secondary min-w-[200px] bg-primary font-mono"
            >
              <p>{t("vendor_agreement")}</p>
              <img
                src="/icons/external-link.svg"
                alt=""
                className="w-[10px] aspect-square"
              />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
