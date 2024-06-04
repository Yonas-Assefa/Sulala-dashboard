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
          <Link href={'/'} locale={lang == 'en' ? 'ar' : 'en'} className="swap bg-white hover:bg-primary text-primary hover:text-white rounded-lg p-2 aspect-square">
            <div className={lang == 'en' ? 'swap-on' : 'swap-off'}>EN</div>
            <div className={lang == 'ar' ? 'swap-on' : 'swap-off'}>AR</div>
          </Link>
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
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/storefront_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">{t('products')}</h6>
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/medical_services_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">{t('services')}</h6>
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/whatshot_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">{t('promotions')}</h6>
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/command_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-full md:w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">{t('drivers')}</h6>
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <footer className="bg-primary w-full flex flex-col items-center">
        <div className="grid grid-cols-5 p-4 md:w-2/3">
          <div>
            <h4 className="text-white font-semibold text-xs md:text-lg font-serif">Sulala</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-white text-[7px] md:text-sm">About us</li>
              <li className="text-white text-[7px] md:text-sm">Contact us</li>
              <li className="text-white text-[7px] md:text-sm">Terms and conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs md:text-lg font-serif">Sulala</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-white text-[7px] md:text-sm">About us</li>
              <li className="text-white text-[7px] md:text-sm">Contact us</li>
              <li className="text-white text-[7px] md:text-sm">Terms and conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs md:text-lg font-serif">Sulala</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-white text-[7px] md:text-sm">About us</li>
              <li className="text-white text-[7px] md:text-sm">Contact us</li>
              <li className="text-white text-[7px] md:text-sm">Terms and conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs md:text-lg font-serif">Sulala</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-white text-[7px] md:text-sm">About us</li>
              <li className="text-white text-[7px] md:text-sm">Contact us</li>
              <li className="text-white text-[7px] md:text-sm">Terms and conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs md:text-lg font-serif">Sulala</h4>
            <ul className="flex flex-col gap-2">
              <li className="text-white text-[7px] md:text-sm">About us</li>
              <li className="text-white text-[7px] md:text-sm">Contact us</li>
              <li className="text-white text-[7px] md:text-sm">Terms and conditions</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-3 p-3 border-t border-white/10 w-full">
          {/* <img src="/sulala-logo-white.svg" alt="" className="w-6" /> */}
          {/* <p className="font-thin font-serif text-xs md:text-sm">sulala.com</p> */}
          <p className="font-thin font-serif text-xs md:text-sm">{t('copyright')}</p>
        </div>
      </footer>
    </div>
  );
}
