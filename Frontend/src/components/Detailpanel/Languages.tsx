import { getLanguages } from "@/api/games/getLanguages";
import { Skeleton } from "@nextui-org/react";
import { TiTick } from "react-icons/ti";
import { useQuery } from "react-query";

export default function Languages({ id, detailsResponse }: any) {
  const LanguageQuery = useQuery(
    ["languages-game", { gameId: id }],
    () => getLanguages(detailsResponse?.data[0].language_supports),
    {
      enabled: !detailsResponse?.isLoading,
    }
  );
  return (
    <section className="mt-12">
      {LanguageQuery?.isLoading ? (
        <Skeleton />
      ) : (
        <section>
          <div className="relative rounded-md pl-2 font-inter    bg-opacity-50 pb-6 col-span-1">
            <div>
              <p className="flex items-start w-full leading-relaxed font-inter text-dm font-weight-600 tracking-wide mt-5">
                <span className="line-clamp-3 text-lg text-left ">
                  Languages
                </span>
              </p>
              <hr className="mt-2 w-4/5" />

              {LanguageQuery?.data.map((element: any, index: any) => (
                <span
                  key={index}
                  className="flex justify-between text-sm pr-12  w-full leading-relaxed text-dm font-weight-600 tracking-wide mt-2 mb-2"
                >
                  {element.name} <TiTick className="text-orange-400 text-xl" />
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}
