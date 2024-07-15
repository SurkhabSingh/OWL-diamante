import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Slider from "react-slick";

import { QueryCache, useQuery } from "@tanstack/react-query";
import { Button, ScrollShadow } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetGames } from "@/hooks/useGetGames";

export function MarketCarousel() {
  const queryCache = new QueryCache({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onSettled: (data, error) => {
      console.log(data, error);
    },
  });

  const settings = {
    className:
      "     opacity-85 hover:opacity-95 transition ease-in  hover:blur-none",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 7000,
    cssEase: "linear",
  };

  const { data, isLoading } = useQuery({
    queryKey: ["game-query"],
  });

  const navigate = useNavigate();

  const randomArray = data?.filter(
    (element: { rating: number; release_dates: string | any[] }) =>
      element.rating >= 70 &&
      element.release_dates[element?.release_dates?.length - 1].date >
        1603171200
  );

  return (
    <section>
      {isLoading ? (
        <Skeleton className="w-full h-[500px] " />
      ) : (
        <ScrollShadow
          hideScrollBar
          orientation="horizontal"
          size={300}
          visibility="both"
        >
          <Slider {...settings}>
            {randomArray?.map(
              (
                element: {
                  name: string | number | boolean | null | undefined;
                  summary: string | number | boolean | null | undefined;
                  id: any;
                  cover: { url: string };
                },
                index: React.Key | null | undefined
              ) => (
                <div key={index} className="flex cursor-grab">
                  <div className="flex flex-1 h-[500px]">
                    <div className="flex flex-1 flex-col items-center pl-48 pr-4 w-[300px]  text-white   bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  ">
                      <div className="py-20 ">
                        {" "}
                        <span className="text-8xl font-jura bg-gradient-to-r text-transparent bg-clip-text line-clamp-2  from-white to-violet-300 mt-8 text-center mb-7 font-extrabold">
                          {element.name}
                        </span>
                        <span className="text-sm text-left line-clamp-2 leading-12 mt-12 mb-4 font-urbanist">
                          {element.summary}
                        </span>
                        <Button
                          onClick={() => navigate(`/game/${element.id}`)}
                          className="p-4 w-42 h-12 text-left text-bold font-jura  text-black font-extrabold"
                        >
                          {" "}
                          Exxplore <ArrowRight />
                        </Button>
                      </div>
                      {/* <div className=" w-[1000px] h-[500px] text-white font-extrabold  absolute bg-gradient-to-r mx-12 from-black/[0.26] via-transparent  rounded-xl bg-opacity-70 overflow-hidden blur-xl"></div> */}
                    </div>
                    <img
                      key={index}
                      className=" flex-1 object-cover"
                      src={element?.cover?.url.replace("t_thumb", "t_1080p")}
                    />
                  </div>
                </div>
              )
            )}
          </Slider>
          <hr className="mt-4" />
        </ScrollShadow>
      )}
    </section>
  );
}
