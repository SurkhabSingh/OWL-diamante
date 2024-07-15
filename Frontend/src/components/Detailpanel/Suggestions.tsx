import Slider from "react-slick";
import gsap from "gsap";
import { useQuery } from "react-query";

import { getRecommendations } from "@/api/games/getRecommendations";
import { useEffect } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollShadow } from "@nextui-org/react";
import Card from "./Cards";
export default function Suggestions({ id, detailsResponse }: any) {
  gsap.registerPlugin(ScrollTrigger);
  const { data: similarGames } = useQuery(
    ["similar-game", { gameId: id }],
    () => getRecommendations(detailsResponse?.data[0].similar_games),
    {
      enabled: !detailsResponse?.isLoading,
    }
  );
  useEffect(() => {
    let ctx = gsap.context(() => {
      let t1 = gsap.timeline({
        scrollTrigger: {
          scrub: 4,
        },
      });
      t1.fromTo(
        ".similar",
        {
          y: 400,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.2,
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const settings = {
    className:
      "    -px-20 opacity-85 hover:opacity-95 transition ease-in  hover:blur-none",
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <section className=" flex flex-col slider-container mb-20 px-20 ">
      <ScrollShadow
        hideScrollBar
        orientation="horizontal"
        size={300}
        visibility="both"
      >
        <div className="text-violet-400 font-dm  text-5xl font-extrabold mb-8 tracking-wider">
          {" "}
          Explore similar titles:
          <hr className="mt-4" />
        </div>
        <Slider {...settings}>
          {similarGames?.map(
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
    </section>
  );
}
