'use client'
import SecondaryButton from "@/components/common/ui/SecondaryButton";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation'

type Props = {
  params: {
    lang: string
  }
}
export default function Landing({ params: { lang } }: Props) {

  type ScrollDirection = 'going-up' | 'going-down' | 'at-top' | 'at-bottom';
  let oldScrollY = 0;

  const [direction, setDirection] = useState<ScrollDirection>('at-top');
  const t = useTranslations('Landing');

  useEffect(() => {
    window.addEventListener('scroll', controlDirection);
    return () => {
      window.removeEventListener('scroll', controlDirection);
    };
  }, [window])

  const controlDirection = () => {
    if (window.scrollY == 0) {
      setDirection('at-top');
      oldScrollY = window.scrollY;
    } else if (window.scrollY + window.innerHeight == document.body.scrollHeight) {
      setDirection('at-bottom');
      oldScrollY = window.scrollY;
    } else if ((window.scrollY > oldScrollY && window.scrollY - oldScrollY > 25) && (window.scrollY > 50)) {
      setDirection('going-down');
      oldScrollY = window.scrollY;
    } else if ((window.scrollY < oldScrollY && window.scrollY - oldScrollY < 25)) {
      setDirection('going-up');
      oldScrollY = window.scrollY;
    }
  }

  return (
    <div className="">
      {['going-up', 'at-top'].includes(direction) && <nav className={`${direction == 'going-up' ? 'bg-white' : 'bg-transparent'} transition-all z-40 flex flex-row justify-between items-center drop-shadow-lg fixed w-full`}>
        <div className='text-black md:p-5 p-2 flex items-center gap-3 self-start'>
          <img src={direction == 'going-up' ? '/sulala-logo.svg' : '/sulala-logo-white.svg'} className='md:w-[40px] w-[30px]' />
          <h2 className={`${direction == 'going-up' ? 'text-primary' : 'text-white'} font-bold font-serif text-[25px]`}>{t('sulala')}</h2>
        </div>
        <div className=" flex flex-row gap-3 px-3">
          <Link href={'/sign-in'} className="bg-primary border-gray-200 hover:border-primary text-white font-semibold border p-2 rounded-lg hover:bg-primary/90 hover:text-white transition-all btn">{t('signin')}</Link>
          <Link href={'/sign-up'} className="bg-white border-gray-200 hover:border-primary text-primary font-semibold border p-2 rounded-lg hover:bg-primary/90 hover:text-white transition-all btn">{t('register')}</Link>
          <Link href={'/'} locale={lang == 'en' ? 'ar' : 'en'} className="swap bg-white hover:bg-primary text-primary hover:text-white rounded-lg p-2 aspect-square self-center">
            <div className={lang == 'en' ? 'swap-on' : 'swap-off'}>EN</div>
            <div className={lang == 'ar' ? 'swap-on' : 'swap-off'}>AR</div>
          </Link>
          {/* <label className="swap swap-rotate bg-white hover:bg-primary fill-primary hover:fill-white rounded-lg p-2 aspect-square self-center">
            <input type="checkbox" />
            <svg className="swap-on w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            <svg className="swap-off w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
          </label> */}
        </div>
      </nav>}


      <section className="h-screen w-screen bg-gradient-to-b relative from-primary to-primary/50 text-white grid grid-cols-1 md:grid-cols-2">
        <div className="h-full flex flex-col justify-between md:justify-center gap-12 py-24 md:py-4 items-center z-20 md:z-auto">
          <div className="flex flex-row justify-center items-center gap-3 ">
            <img src="/sulala-logo-white.svg" alt="" className="w-12 md:w-16 aspect-square" />
            <h1 className="font-semibold text-4xl md:text-5xl font-serif space-x-2">{t('sulala')}</h1>
          </div>
          <div className="w-11/12 md:w-2/3 text-center">
            <p className="text-2xl md:text-3xl font-semibold font-serif">{t('hero_title')}</p>
          </div>
          <div className="w-11/12 md:w-2/3 text-center">
            <p className="text-md md:text-xl font-normal font-serif">{t('hero_description')}</p>
          </div>
          <div>
            <SecondaryButton name={t('hero_button')} href="/auth/sign-up" padding="md" />
          </div>
        </div>
        <div className={`h-full absolute -top-16 md:top-auto z-10 md:relative md:z-auto opacity-20 md:opacity-100 bg-gradient-to-l ${lang == 'en' ? 'from-black/60 to-black/0' : 'to-black/60 from-black/0'} flex flex-col justify-center`}>
          <img src="/images/sulala-pc-phone.png" alt="" />
        </div>
      </section>



      <section className="h-screen w-screen bg-white grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2 absolute z-10 md:relative md:z-auto h-full opacity-20 md:opacity-100 flex flex-col justify-center items-center object-fill bg-gradient-to-r from-primary/15 to-primary/0">
          <img src="/images/sulala-phone.png" alt="" className="h-3/3 w-1/2" />
        </div>
        <div className="md:col-span-3 z-20 md:z-auto p-5 md:p-auto flex flex-col justify-center items-start gap-14 bg-gradient-to-r from-white to-primary/15">
          <h3 className="font-semibold text-primary text-3xl font-serif">{t('what_we_provide')}</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex flex-row gap-2">
              <img src="/icons/shopping_bag_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">{t('orders')}</h6>
                <p className="text-black text-sm italic">{t('orders_description')}</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/storefront_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">{t('products')}</h6>
                <p className="text-black text-sm italic">{t('products_description')}</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/medical_services_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">{t('services')}</h6>
                <p className="text-black text-sm italic">{t('services_description')}</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/whatshot_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">{t('promotions')}</h6>
                <p className="text-black text-sm italic">{t('promotions_description')}</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/command_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">{t('drivers')}</h6>
                <p className="text-black text-sm italic">{t('drivers_description')}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <footer className="bg-primary w-full flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-5 p-4 gap-3 md:gap-0 md:w-2/3">
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">{t('increase_your_productivity')}</h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">{t('streamline_your_operations')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('automate_your_sales')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('increase_your_average_order_value')}</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">{t('promote_your_products')}</h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">{t('get_your_branding_in_the_headlines')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('craft_your_marketing_strategy')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('utilize_marketplace_analytics')}</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">{t('track_your_delivery')}</h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">{t('real_time_order_tracking')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('transparent_delivery_process')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('multiple_payment_options')}</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">{t('connect_with_buyers')}</h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">{t('personalized_customer_service')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('community_building')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('build_your_brand_story')}</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white underline font-semibold text-xs md:text-md font-serif">{t('get_support')}</h4>
            <ul className="flex flex-col gap-1">
              <li className="text-white text-[7px] md:text-[10px] italic">{t('dedicated_help_center')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('24/7_customer_support')}</li>
              <li className="text-white text-[7px] md:text-[10px] italic">{t('community_forums')}</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-6 justify-center my-3 w-full">
          <img src="/icons/social_media/facebook.svg" alt="" className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all" />
          <img src="/icons/social_media/instagram.svg" alt="" className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all" />
          <img src="/icons/social_media/telegram.svg" alt="" className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all" />
          <img src="/icons/social_media/email.svg" alt="" className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all" />
          <img src="/icons/social_media/youtube.svg" alt="" className="bg-white rounded-full aspect-square p-1 drop-shadow-lg w-[25px] cursor-pointer hover:scale-110 transition-all" />
        </div>
        <div className="flex flex-row gap-6 justify-center w-full my-3 text-sm text-white bg-primary">
          <p>English</p>
          <p>عربي</p>
        </div>
        <div className="flex flex-row justify-center items-center gap-3 p-3 border-t border-white/10 w-full">
          <img src="/sulala-logo-white.svg" alt="" className="w-6" />
          {/* <p className="font-thin font-serif text-xs md:text-sm">sulala.com</p> */}
          <p className="font-thin font-serif text-xs md:text-sm">{t('copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
