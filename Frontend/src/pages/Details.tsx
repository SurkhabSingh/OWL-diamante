import { NavbarComp } from "@/components/Navbar";
import GameDetails from "@/components/Detailpanel/GameDetails";
import TextSection from "@/components/Detailpanel/TextSection";
import Footer from "@/components/Home/Footer";
import { useParams } from "react-router-dom";
import { useGetVideos } from "@/hooks/useGetVideos";
import Suggestions from "@/components/Detailpanel/Suggestions";
import { QueryClient, QueryClientProvider } from "react-query";
import { SkeletonGrid } from "@/components/Marketplace/SkeletonGrid";
import { useGetDetails } from "@/hooks/useGetDetails";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export type DetailType = {
  id: number;
  name: string;
  similar_games: number[];
  screenshots: [
    {
      id: number;
      url: string;
    }
  ];
  cover: {
    id: number;
    url: string;
  };
  videos: number;
  summary: string;
  release_dates: [
    {
      date: number;
      id: number;
    }
  ];
  rating: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
};

export function GameDetailsPage() {
  const { id } = useParams();

  const detailsResponse = useGetDetails(id);

  const query = new QueryClient();

  const videoResponse = useGetVideos(id);

  return (
    <QueryClientProvider client={query}>
      <section className="flex flex-col  2xl:px-36 medium:px-48 extra:px-60">
        <div className="fixed top-0 right-0 flex items-center justify-center w-6 h-6 p-3 m-8 font-mono text-xs text-white bg-gray-700 rounded-full sm:bg-pink-500 md:bg-orange-500 lg:bg-green-500 xl:bg-blue-500 2xl:bg-purple-500 medium:bg-yellow-400 extra:bg-green-800">
          <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
            al
          </div>
          <div className="hidden sm:block md:hidden lg:hidden xl:hidden">
            sm
          </div>
          <div className="hidden sm:hidden md:block lg:hidden xl:hidden">
            md
          </div>
          <div className="hidden sm:hidden md:hidden lg:block xl:hidden">
            lg
          </div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
            xl
          </div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block medium:hidden extra:hidden ">
            2xl
          </div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden medium:block  extra:hidden  ">
            medium
          </div>
          <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden medium:hidden extra:block">
            extra
          </div>
        </div>
        <div className="px-2 py-4 flex mb-5 justify-between flex-col sm:px-30 md:px-10 h-max">
          <NavbarComp />
          {detailsResponse?.isLoading || videoResponse?.isLoading ? (
            <SkeletonGrid />
          ) : (
            <div>
              <GameDetails
                data={detailsResponse?.data[0]}
                video={videoResponse?.videoRef}
              />

              <TextSection
                summary={detailsResponse?.data[0]?.summary}
                id={id}
                detailsResponse={detailsResponse}
              />

              <Suggestions id={id} detailsResponse={detailsResponse} />
            </div>
          )}
        </div>

        <Footer />
      </section>
    </QueryClientProvider>
  );
}
