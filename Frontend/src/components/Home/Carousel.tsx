import { Link, useNavigate } from "react-router-dom";
import { CarouselPlugin } from "../common/Carousel";
import { Button } from "@nextui-org/react";

export default function Carousel() {
  const navigate = useNavigate();
  return (
    <section className="container flex justify-center p-6 pr-20 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <div className="w-60 flex-1">
        <CarouselPlugin />
      </div>
      <div className="flex flex-col flex-1 justify-center shadow-2xl p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <h1 className="text-5xl font-bold leading-none sm:text-6xl">
          <h1 className="text-nowrap">
            <span className="text-violet-400">Explore</span> a wide
          </h1>
          <h1 className="text-nowrap">
            variety of <span className="text-violet-400">games.</span>
          </h1>
        </h1>
        <p className="mt-6 mb-8 text-lg sm:mb-12 font-urbanist">
          Discover a curated collection of games that push the boundaries of
          traditional gaming, all stored securely on the blockchain.
        </p>
        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
          <Button
            rel="noopener noreferrer"
            onClick={() => navigate("/market")}
            className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100"
          >
            Explore
          </Button>
        </div>
      </div>
    </section>
  );
}
