import * as React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";

import Card from "../Detailpanel/Cards";
import { ScrollShadow } from "@nextui-org/react";

export function CarouselPlugin() {
  const { data } = useQuery({ queryKey: ["game-query"] });

  const randData = data?.slice(0, 10);
  
  const settings = {
    className:
      "  opacity-85 hover:opacity-95 transition ease-in  hover:blur-none",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <ScrollShadow
      hideScrollBar
      orientation="horizontal"
      size={200}
      visibility="both"
    >
      <Slider {...settings}>
        {randData?.map(
          (
            element: {
              id: number;
              cover: { url: string };
              name: string;
              rating: number;
              genres: { name: any }[];
              release_dates: { date: number }[];
              summary: string;
            },
            index: React.Key | null | undefined
          ) => (
            <Card
              key={index}
              index={element.id}
              url={element.cover.url}
              name={element.name}
            />
          )
        )}
      </Slider>
    </ScrollShadow>
  );
}
