import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import scorpion from "../../assets/scorpion.png";
import { Button } from "@nextui-org/react";

export default function HeroBanner() {
  const component = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(
      () => {
        let tl = gsap.timeline();

        tl.fromTo(
          ".hero-banner",
          {
            y: 200,
            opacity: 0,
            scale: 1,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
          }
        );
      },

      component
    );
    return () => ctx.revert();
  }, []);
  return (
    <section className="  dark:bg-gray-800 dark:text-gray-100" ref={component}>
      <div className="container flex flex-col justify-center p-6 pr-20 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="absolute inset-x-0 mt-20 ml-60 pl-60 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[30.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8E0E00" />
                <stop offset={2} stopColor="#1F1C18" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex flex-col hero-banner justify-center shadow-2xl p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold flex flex-col leading-none text-dm tracking-tighter sm:text-6xl">
            <span className="text-nowrap">
              Transforming <span className="text-violet-400">Play</span>
            </span>
            <span className="text-nowrap">
              Unleashing <span className="text-violet-400">Ownership</span>
            </span>

            <span className="text-violet-400"></span>
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Your Games, Your Way,
            <br />
            Our<span className="font-bold"> Innovation.</span>
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link rel="noopener noreferrer" to="/market">
              <Button
                variant="flat"
                className=" p-6 ml-2  text-xl text-gray-900 tracking-wider font-semibold rounded font-urbanist bg-violet-400/[0.87] "
              >
                Marketplace
              </Button>
            </Link>
            {/* <Link rel="noopener noreferrer" to="#">
              <Button
                variant="flat"
                className=" p-6  text-xl  tracking-wider font-semibold rounded font-urbanist bg-white/[0.78] text-gray-900"
              >
                Profile
              </Button>
            </Link> */}
          </div>
        </div>
        <div className="sm:flex items-center justify-center  hidden mt-8 lg:mt-0 h-[500px] sm:pl-20 sm:visible ">
          <img
            src={scorpion}
            alt="Scorpian-looking-kinda-cool"
            className="object-cover brightness-90 h-full"
          />
        </div>
      </div>
    </section>
  );
}
