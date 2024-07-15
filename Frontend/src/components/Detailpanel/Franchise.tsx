import { getFranchises } from "@/api/games/getFranchises";
import { getRecommendations } from "@/api/games/getRecommendations";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "@nextui-org/react";

import FranchiseCards from "../common/FranchiseCards";

export default function Franchise({ id, detailsResponse }: any) {
  const franchiseQuery = useQuery({
    queryKey: ["franchise", { gameId: id }],
    queryFn: () => getFranchises(detailsResponse?.data[0].franchises),
    enabled: !detailsResponse?.isLoading,
  });
  const { data: franchiseGames } = useQuery({
    queryKey: ["franchise-games", { gameId: id }],
    queryFn: () => getRecommendations(franchiseQuery?.data[0].games),
    enabled: !franchiseQuery.isLoading,
  });

  const settings = {
    className: " ml-32 w-[60vw] center",
    dots: true,
    slidesToShow: 5,
    slidesToScroll: 0.9,
    autoplay: false,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  return (
    <section className="w-full ">
      {!franchiseQuery.data ||
      (franchiseQuery.data.length === 1 &&
        franchiseQuery.data[0].status === 400) ? (
        <div className="font-urbanist text-3xl">
          {" "}
          Sadly this game does not belong to any franchise.
        </div>
      ) : (
        <section className="">
          <div className="bg-gradient-to-r  from-blue-500 to-blue-900 text-transparent bg-clip-text font-inter flex justify-between text-left text-3xl font-semibold mb-8 tracking-wider ">
            {" "}
            <span>{`Explore the ${franchiseQuery?.data[0]?.name} Franchise:`}</span>
            <Button variant="solid">More///</Button>
          </div>
          <div className="flex gap-4">
            {franchiseGames?.slice(0, 4).map(
              (
                element: {
                  id: number;
                  cover: { url: string };
                  name: string;
                },
                index: React.Key | null | undefined
              ) => (
                <FranchiseCards
                  key={index}
                  id={element.id}
                  url={element.cover?.url}
                  title={element.name}
                />
              )
            )}
          </div>
        </section>
      )}
    </section>
  );
}
