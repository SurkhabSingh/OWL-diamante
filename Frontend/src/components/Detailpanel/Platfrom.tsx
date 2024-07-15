import { getPlatforms } from "@/api/games/getPlatforms";
import { Skeleton } from "@nextui-org/react";
import { TiTick } from "react-icons/ti";
import { useQuery } from "@tanstack/react-query";

export default function Platform({ id, detailsResponse }: any) {
  const platformQuery = useQuery({
    queryKey: ["platform-game", { gameId: id }],
    queryFn: () => getPlatforms(detailsResponse?.data[0].platforms),
    enabled: !detailsResponse?.isLoading,
  });
  console.log(platformQuery.data);
  return (
    <section className="mt-12">
      {platformQuery?.isLoading ? (
        <Skeleton />
      ) : (
        <section>
          <div className="relative rounded-md pl-2 font-inter   bg-opacity-50 pb-6 col-span-1">
            <div>
              <p className="flex items-start w-full leading-relaxed font-inter text-dm font-weight-600 tracking-wide mt-5 ">
                <span className="line-clamp-3 text-2xl  text-left ">
                  Available on:
                </span>
              </p>
              <hr className="mt-2 w-4/5" />{" "}
              {platformQuery?.data.map((element: any, index: any) => (
                <span
                  key={index}
                  className="flex justify-between pr-12  w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-2 mb-2"
                >
                  {element.abbreviation}{" "}
                  <TiTick className="text-green-400 text-3xl" />
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
