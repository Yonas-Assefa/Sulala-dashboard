'use client'
import SecondaryButton from "@/components/common/ui/SecondaryButton";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { useEffect, useState } from "react";

const responsiveOptions = [
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
];

const customers = [
  { name: 'Item 1', price: '$100', image: 'https://randomuser.me/api/portraits/men/85.jpg', inventoryStatus: 'Out of Stock' },
  { name: 'Item 2', price: '$150', image: 'https://randomuser.me/api/portraits/men/62.jpg', inventoryStatus: 'Out of Stock' },
  { name: 'Item 3', price: '$25', image: 'https://randomuser.me/api/portraits/women/28.jpg', inventoryStatus: 'Out of Stock' },
]

const productTemplate = (customer: any) => {

  return (
    <div className="border-1 surface-border bg-gradient-to-br from-primary/85 via-primary to-primary/35 drop-shadow-lg border-round m-2 text-center py-5 px-3">
      <div className="mb-3 w-full h-full">
        <img src={customer.image} alt={customer.name} className="w-14 rounded-full shadow-2" />
      </div>
      <div>
        <h4 className="mb-1">{customer.name}</h4>
        <h6 className="mt-0 mb-3">${customer.price}</h6>
        <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
          <Button icon="pi pi-search" className="p-button p-button-rounded" />
          <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded" />
        </div>
      </div>
    </div>
  );
};

export default function Home() {

  type ScrollDirection = 'going-up' | 'going-down' | 'at-top' | 'at-bottom';
  let oldScrollY = 0;

  const [direction, setDirection] = useState<ScrollDirection>('at-top');

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
          <h2 className={`${direction == 'going-up' ? 'text-primary' : 'text-white'} font-bold font-serif text-[25px]`}>Sulala</h2>
        </div>
        <div className=" flex flex-row gap-3 px-3">
          <Link href={'/auth/sign-in'} className="bg-primary border-gray-200 hover:border-primary text-white font-semibold border p-2 rounded-lg hover:bg-primary/90 hover:text-white transition-all btn">Sign in</Link>
          <Link href={'/auth/sign-up'} className="bg-white border-gray-200 hover:border-primary text-primary font-semibold border p-2 rounded-lg hover:bg-primary/90 hover:text-white transition-all btn">Register</Link>
        </div>
      </nav>}


      <section className="h-screen w-screen bg-gradient-to-b from-primary to-primary/50 text-white grid grid-cols-1 md:grid-cols-2">
        <div className="h-full flex flex-col justify-center gap-12 py-24 md:py-4 items-center z-20 md:z-auto">
          <div className="flex flex-row justify-center items-center gap-3 ">
            <img src="/sulala-logo-white.svg" alt="" className="w-12 md:w-16 aspect-square" />
            <h1 className="font-semibold text-4xl md:text-5xl font-serif space-x-2">Sulala</h1>
          </div>
          <div className="w-11/12 md:w-2/3 text-center">
            <p className="text-2xl md:text-3xl font-semibold font-mono">Discover the Premier Marketplace for Animals and Dairy Products</p>
          </div>
          <div className="w-11/12 md:w-2/3 text-center">
            <p className="text-lg md:text-xl font-normal font-mono">Unlock a world of opportunities by joining our thriving community, where you can effortlessly trade and manage your exceptional range of products, reaching customers across the globe. </p>
          </div>
          <div>
            <SecondaryButton name="Get Started" href="/auth/sign-up" padding="md" />
          </div>
        </div>
        <div className="h-full absolute z-10 md:relative md:z-auto opacity-20 md:opacity-100 bg-gradient-to-l from-black/60 to-black/0 flex flex-col justify-center">
          <img src="/images/sulala-pc-phone.png" alt="" />
        </div>
      </section>



      <section className="h-screen w-screen bg-white grid grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-2 absolute z-10 md:relative md:z-auto h-full opacity-20 md:opacity-100 flex flex-col justify-center items-center object-fill bg-gradient-to-r from-primary/15 to-primary/0">
          <img src="/images/sulala-phone.png" alt="" className="h-3/3 w-1/2" />
        </div>
        <div className="md:col-span-3 z-20 md:z-auto p-5 md:p-auto flex flex-col justify-center items-start gap-4 bg-gradient-to-r from-white to-primary/15">
          <h3 className="font-semibold text-primary text-3xl font-serif">What we provide...</h3>
          <ul className="flex flex-col gap-4">
            <li className="flex flex-row gap-2">
              <img src="/icons/shopping_bag_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">Orders</h6>
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/storefront_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">Products</h6>
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/medical_services_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">Services</h6>
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/whatshot_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">Promotions</h6>
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
            <li className="flex flex-row gap-2">
              <img src="/icons/command_active.svg" alt="" className="bg-gradient-to-br from-primary to-primary/20 p-3 rounded-full h-[50px]" />
              <div className="w-2/3">
                <h6 className="text-primary text-lg font-semibold font-serif">Drivers</h6>
                <p className="text-black text-sm italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla vero laboriosam nemo inventore.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>


      <section className="h-auto w-auto bg-tertiary flex justify-between flex-col">
        <div className="h-2/3 flex flex-col justify-center">
          <h4 className="text-primary p-4 font-semibold text-3xl font-serif">What our clients say</h4>
          <Carousel value={customers} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} className="custom-carousel" circular
            autoplayInterval={3000} itemTemplate={productTemplate} />
        </div>
        <div>
          <h4 className="text-primary p-4 font-semibold text-3xl font-serif">Our partners</h4>
          <Marquee className="w-full" autoFill >
            <img src="/sulala-logo.svg" alt="" className="p-3 h-[100px] mx-8" />
          </Marquee>
        </div>
        {/* <div className="w-full flex flex-row justify-center m-8">
          <div>
            <PrimaryButton name="Get Started today" href="/auth/sign-up?by=email" padding="md" />
          </div>
        </div> */}
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
        <div className="flex flex-row justify-center gap-3 p-3 border-t border-white/10 w-full">
          <img src="/sulala-logo-white.svg" alt="" className="w-6" />
          <p className="font-thin font-serif text-xs md:text-sm">sulala.com All copy right reserved 2024.</p>
        </div>
      </footer>
    </div>
  );
}
