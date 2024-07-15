import { Suspense } from "react";
import { MarketCarousel } from "./MarketCarousel";
import Loading from "../Loading";

export default function Banner() {
  return (
    <div className="relative flex flex-row bg-background justify-center items-center">
      <div className=" w-10 rotate-180 ">
        <h1 className=" justify-center uppercase font-dm rotate-90 -mt-48 ml-10  text-[24px] font-semibold tracking-widest text-white  text-nowrap">
          <span className="text-violet-300  mr-2">Upcoming</span> Releases
        </h1>
      </div>

      <div className="rounded-lg w-[80vw] py-6 mr-12 ">
        <Suspense fallback={<Loading className="" />}>
          <MarketCarousel />
        </Suspense>
      </div>
    </div>
  );
}
